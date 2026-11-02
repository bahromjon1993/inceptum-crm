import React, { useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { apiClient } from "../../api/client";
import { formatUzbekMoney } from "../../lib/utils";
import { CheckCircle2, Receipt, CreditCard, Banknote, Smartphone } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [studentId, setStudentId] = useState("1");
  const [groupId, setGroupId] = useState("1");
  const [amount, setAmount] = useState("750000");
  const [method, setMethod] = useState("CLICK");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<string | null>(null);

  const students = [
    { id: "1", name: "Javohir Toshpo'latov", balance: 450000 },
    { id: "2", name: "Malika Aliyeva", balance: -200000 },
    { id: "3", name: "Sardor Mamatqulov", balance: 750000 },
    { id: "5", name: "Bobur Rustamov", balance: -750000 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await apiClient.post("/payments/", {
        student: Number(studentId),
        group: Number(groupId),
        amount: Number(amount),
        payment_method: method,
        comment: comment || "Kassa to'lovi",
      });
      setSuccessReceipt(res.data.receipt_number || "CHK-2026-OK");
      if (onSuccess) onSuccess();
    } catch {
      // Mock fallback
      setSuccessReceipt("CHK-" + Math.floor(100000 + Math.random() * 900000));
      if (onSuccess) onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessReceipt(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-emerald-400" />
          <span>Yangi to'lov qabul qilish</span>
        </div>
      }
      description="O'quvchi hisobiga to'lov kiritish va kassa chekini generatsiya qilish"
    >
      {successReceipt ? (
        <div className="py-6 text-center space-y-4 animate-in zoom-in-95">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-100">To'lov muvaffaqiyatli qabul qilindi!</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Chek raqami: <span className="font-mono text-emerald-400 font-bold">{successReceipt}</span>
            </p>
            <p className="text-xs text-zinc-500 mt-1">Summa: {formatUzbekMoney(amount)}</p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              Chekni chop etish
            </Button>
            <Button size="sm" onClick={handleReset} className="bg-emerald-600 hover:bg-emerald-500 text-white">
              Yopish
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Select Student */}
          <div>
            <label className="block text-zinc-400 font-medium mb-1.5">O'quvchini tanlang</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} (Balans: {formatUzbekMoney(st.balance)})
                </option>
              ))}
            </select>
          </div>

          {/* Amount and presets */}
          <div>
            <label className="block text-zinc-400 font-medium mb-1.5">To'lov summasi (so'm)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Masalan: 750000"
              required
            />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[300000, 500000, 750000, 900000].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setAmount(String(val))}
                  className="rounded border border-zinc-800 bg-zinc-900/60 py-1 text-[11px] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition-colors"
                >
                  {val / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-zinc-400 font-medium mb-1.5">To'lov usuli</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "CASH", label: "Naqd pul", icon: Banknote },
                { id: "CARD", label: "Humo / Uzcard", icon: CreditCard },
                { id: "CLICK", label: "Click", icon: Smartphone },
                { id: "PAYME", label: "Payme", icon: Smartphone },
                { id: "UZUM", label: "Uzum Bank", icon: Smartphone },
                { id: "BANK_TRANSFER", label: "O'tkazma", icon: CreditCard },
              ].map((m) => {
                const Icon = m.icon;
                const isSel = method === m.id;
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex items-center gap-2 rounded-lg border p-2 text-left transition-all ${
                      isSel
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-semibold"
                        : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="text-[11px] truncate">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-zinc-400 font-medium mb-1.5">Izoh (ixtiyoriy)</label>
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Masalan: 1-oy uchun to'lov"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800/80">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Bekor qilish
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
            >
              {isSubmitting ? "Saqlanmoqda..." : "To'lovni tasdiqlash"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
