export type UserRole = 'CEO' | 'ADMIN' | 'TEACHER' | 'OPERATOR' | 'STUDENT';

export interface UserPermissions {
  can_view_finance?: boolean;
  can_create_payment?: boolean;
  can_give_discount?: boolean;
  can_give_coins?: boolean;
  can_manage_roles?: boolean;
  can_delete_records?: boolean;
  can_export_reports?: boolean;
  can_send_sms?: boolean;
  can_manage_groups?: boolean;
  can_manage_students?: boolean;
}

export interface User {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: UserRole;
  role_display?: string;
  branch?: string;
  avatar_url?: string;
  permissions?: UserPermissions;
}

export interface RolePermission {
  id: number;
  role: UserRole;
  role_name: string;
  description: string;
  user_count: number;
  can_view_finance: boolean;
  can_create_payment: boolean;
  can_give_discount: boolean;
  can_give_coins: boolean;
  can_manage_roles: boolean;
  can_delete_records: boolean;
  can_export_reports: boolean;
  can_send_sms: boolean;
  can_manage_groups: boolean;
  can_manage_students: boolean;
}

export interface Branch {
  id: number;
  name: string;
  code: string;
  address: string;
  phone: string;
  is_active: boolean;
}

export interface Teacher {
  id: number;
  name: string;
  phone: string;
  subject: string;
  salary_type: 'PERCENTAGE' | 'FIXED' | 'HOURLY';
  salary_type_display: string;
  salary_rate: number;
  branch: number;
  branch_name: string;
  avatar_url?: string;
  is_active?: boolean;
  active_groups_count: number;
  created_at?: string;
}

export interface Group {
  id: number;
  name: string;
  course: number;
  course_name: string;
  teacher: number;
  teacher_name: string;
  teacher_avatar?: string;
  room?: number;
  room_name?: string;
  branch: number;
  branch_name: string;
  schedule_days: string;
  schedule_time: string;
  grading_system: 'UZBEK_5' | 'COIN_SYSTEM' | 'IELTS_BAND' | 'PERCENT_100';
  grading_system_display: string;
  monthly_fee: number;
  status: 'ACTIVE' | 'PENDING' | 'FINISHED';
  status_display: string;
  students_count: number;
  start_date?: string;
}

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  parent_phone?: string;
  parent_name?: string;
  balance: number;
  coins: number;
  branch: number;
  branch_name: string;
  status: 'ACTIVE' | 'IN_DEBT' | 'FROZEN' | 'LEFT';
  status_display: string;
  joined_date: string;
  avatar_url?: string;
  active_groups: string[];
}

export interface AttendanceRecord {
  id: number;
  student_id: number;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'EXCUSED' | 'LATE';
  note?: string;
}

export interface DailyGradeRecord {
  id: number;
  student_id: number;
  date: string;
  lesson_topic: string;
  homework_score: number;
  activity_score: number;
  exam_score?: number;
  average_score: number;
  coin_earned: number;
  comment?: string;
}

export interface PaymentRecord {
  id: number;
  receipt_number: string;
  student: number;
  student_name: string;
  student_phone?: string;
  group?: number;
  group_name?: string;
  amount: number;
  payment_method: string;
  method_display: string;
  cashier_name?: string;
  comment?: string;
  created_at: string;
}

export interface ExamRecord {
  id: number;
  title: string;
  group?: number;
  group_name?: string;
  course_name?: string;
  date: string;
  time: string;
  room_name?: string;
  examiner_name?: string;
  max_score: number;
  pass_score: number;
  is_completed: boolean;
  participants_count: number;
  passed_count: number;
}

export interface AuditLogRecord {
  id: number;
  user_name: string;
  action: string;
  action_display: string;
  title: string;
  description: string;
  ip_address?: string;
  formatted_time: string;
  created_at: string;
}

export interface ReceiptSettings {
  id: number;
  center_name: string;
  branch_name: string;
  address: string;
  phone: string;
  header_message: string;
  footer_message: string;
  printer_width: '58mm' | '80mm';
  show_balance: boolean;
  show_qr_code: boolean;
}
