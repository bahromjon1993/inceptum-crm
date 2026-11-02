from decimal import Decimal
from rest_framework import serializers, viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Payment, Discount, CoinTransaction, ReceiptSetting
from students.models import Student
from groups.models import Group
from audit_logs.models import AuditLog

class PaymentSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    student_phone = serializers.CharField(source='student.phone', read_only=True)
    group_name = serializers.CharField(source='group.name', read_only=True)
    cashier_name = serializers.CharField(source='cashier.full_name', read_only=True)
    method_display = serializers.CharField(source='get_payment_method_display', read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id', 'receipt_number', 'student', 'student_name', 'student_phone',
            'group', 'group_name', 'amount', 'payment_method', 'method_display',
            'cashier', 'cashier_name', 'comment', 'created_at'
        ]
        read_only_fields = ['id', 'receipt_number', 'created_at']

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("To'lov summasi 0 dan katta bo'lishi kerak!")
        return value

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().select_related('student', 'group', 'cashier').order_by('-created_at')
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        payment = serializer.save(cashier=self.request.user)
        # Update student balance
        student = payment.student
        student.balance += payment.amount
        if student.balance >= 0 and student.status == Student.Status.IN_DEBT:
            student.status = Student.Status.ACTIVE
        student.save(update_fields=['balance', 'status'])

        AuditLog.objects.create(
            user=self.request.user,
            user_name=self.request.user.full_name,
            action=AuditLog.ActionType.PAYMENT,
            title='To\'lov qabul qilindi',
            description=f"O'quvchi: {student.full_name} | Summa: {payment.amount:,.0f} so'm | Chek: {payment.receipt_number}",
            ip_address=getattr(self.request, 'client_ip', None)
        )

class ReceiptSettingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        setting, _ = ReceiptSetting.objects.get_or_create(id=1)
        return Response({
            'id': setting.id,
            'center_name': setting.center_name,
            'branch_name': setting.branch_name,
            'address': setting.address,
            'phone': setting.phone,
            'header_message': setting.header_message,
            'footer_message': setting.footer_message,
            'printer_width': setting.printer_width,
            'show_balance': setting.show_balance,
            'show_qr_code': setting.show_qr_code,
        })

    def put(self, request):
        setting, _ = ReceiptSetting.objects.get_or_create(id=1)
        for key in ['center_name', 'branch_name', 'address', 'phone', 'header_message', 'footer_message', 'printer_width', 'show_balance', 'show_qr_code']:
            if key in request.data:
                setattr(setting, key, request.data[key])
        setting.save()

        AuditLog.objects.create(
            user=request.user,
            user_name=request.user.full_name,
            action=AuditLog.ActionType.SETTINGS,
            title='Chek sozlamalari yangilandi',
            description=f"Kassa cheki dizayni va rekvizitlari yangilandi ({setting.printer_width})",
            ip_address=getattr(request, 'client_ip', None)
        )

        return Response({'status': 'success', 'message': 'Chek sozlamalari muvaffaqiyatli saqlandi!'})

class GiveCoinsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        student_id = request.data.get('student_id')
        amount = int(request.data.get('amount', 0))
        reason = request.data.get('reason', 'Rag\'batlantirish')

        if amount == 0:
            return Response({'detail': 'Coin miqdori 0 bo\'lmasligi kerak'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response({'detail': 'O\'quvchi topilmadi'}, status=status.HTTP_404_NOT_FOUND)

        student.coins += amount
        if student.coins < 0:
            student.coins = 0
        student.save(update_fields=['coins'])

        CoinTransaction.objects.create(
            student=student,
            amount=amount,
            reason=reason,
            granted_by=request.user
        )

        AuditLog.objects.create(
            user=request.user,
            user_name=request.user.full_name,
            action=AuditLog.ActionType.COIN,
            title=f"Coin berildi: {student.full_name}",
            description=f"Miqdor: {amount:+d} coin | Sabab: {reason}",
            ip_address=getattr(request, 'client_ip', None)
        )

        return Response({
            'status': 'success',
            'coins': student.coins,
            'message': f"{student.full_name} hisobiga {amount:+d} coin o'tkazildi!"
        })

class GiveDiscountView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        student_id = request.data.get('student_id')
        group_id = request.data.get('group_id')
        percentage = Decimal(str(request.data.get('percentage', 0)))
        reason = request.data.get('reason', 'Maxsus chegirma')

        if percentage <= 0 or percentage > 100:
            return Response({'detail': 'Chegirma foizi 1 va 100 oralig\'ida bo\'lishi kerak'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response({'detail': 'O\'quvchi topilmadi'}, status=status.HTTP_404_NOT_FOUND)

        Discount.objects.create(
            student=student,
            group_id=group_id,
            percentage=percentage,
            reason=reason,
            granted_by=request.user
        )

        AuditLog.objects.create(
            user=request.user,
            user_name=request.user.full_name,
            action=AuditLog.ActionType.DISCOUNT,
            title=f"Chegirma berildi: {student.full_name}",
            description=f"Foiz: {percentage}% | Sabab: {reason}",
            ip_address=getattr(request, 'client_ip', None)
        )

        return Response({
            'status': 'success',
            'message': f"{student.full_name} uchun {percentage}% chegirma tasdiqlandi!"
        })
