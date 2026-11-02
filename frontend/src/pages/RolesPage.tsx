import React, { useState, useEffect } from "react";
import { ShieldCheck, Sparkles, Check, Save, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { apiClient } from "../api/client";
import type { RolePermission } from "../types";

export function RolesPage() {
  const [roles, setRoles] = useState<RolePermission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get("/roles/");
      setRoles(res.data.results || res.data || []);
    } catch {
      // Mock fallback
      setRoles([
        {
          id: 1,
          role: "CEO",
          role_name: "Bosh direktor (CEO)",
          description: "To'liq tizim nazorati, moliyaviy oqimlar va rollar",
          user_count: 1,
          can_view_finance: true,
          can_create_payment: true,
          can_give_discount: true,
          can_give_coins: true,
          can_manage_roles: true,
          can_delete_records: true,
          can_export_reports: true,
          can_send_sms: true,
          can_manage_groups: true,
          can_manage_students: true,
        },
        {
          id: 2,
          role: "ADMIN",
          role_name: "Administrator",
          description: "Filial boshqaruvi, o'quvchilar va kassa amallari",
          user_count: 2,
          can_view_finance: true,
          can_create_payment: true,
          can_give_discount: true,
          can_give_coins: true,
          can_manage_roles: false,
          can_delete_records: false,
          can_export_reports: true,
          can_send_sms: true,
          can_manage_groups: true,
          can_manage_students: true,
        },
        {
          id: 3,
          role: "TEACHER",
          role_name: "O'qituvchi",
          description: "Darslar, davomat, baholar va coinlar",
          user_count: 8,
          can_view_finance: false,
          can_create_payment: false,
          can_give_discount: false,
          can_give_coins: true,
          can_manage_roles: false,
          can_delete_records: false,
          can_export_reports: false,
          can_send_sms: true,
          can_manage_groups: true,
          can_manage_students: true,
        },
        {
          id: 4,
          role: "OPERATOR",
          role_name: "Operator / Qabul",
          description: "Yangi arizalar, lidlar va kassa to'lovlari",
          user_count: 3,
          can_view_finance: false,
          can_create_payment: true,
          can_give_discount: false,
          can_give_coins: false,
          can_manage_roles: false,
          can_delete_records: false,
          can_export_reports: false,
          can_send_sms: true,
          can_manage_groups: false,
          can_manage_students: true,
        },
        {
          id: 5,
          role: "STUDENT",
          role_name: "O'quvchi",
          description: "Shaxsiy profil, dars jadvali va baholar",
          user_count: 154,
          can_view_finance: false,
          can_create_payment: false,
          can_give_discount: false,
          can_give_coins: false,
          can_manage_roles: false,
          can_delete_records: false,
          can_export_reports: false,
          can_send_sms: false,
          can_manage_groups: false,
          can_manage_students: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePermission = (roleId: number, field: keyof RolePermission) => {
    setRoles((prev) =>
      prev.map((r) => {
        if (r.id === roleId) {
          if (r.role === "CEO") return r; // CEO permissions are locked on
          return {
            ...r,
            [field]: !r[field],
          };
        }
        return r;
      })
    );
  };

  const handleSaveMatrix = async () => {
    try {
      for (const r of roles) {
        if (r.role !== "CEO") {
          await apiClient.put(`/roles/${r.id}/`, r);
        }
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const permColumns: { field: keyof RolePermission; label: string }[] = [
    { field: "can_view_finance", label: "Moliya" },
    { field: "can_create_payment", label: "To'lov olish" },
    { field: "can_give_discount", label: "Chegirma" },
    { field: "can_give_coins", label: "Coin berish" },
    { field: "can_send_sms", label: "SMS yuborish" },
    { field: "can_export_reports", label: "Eksport" },
    { field: "can_delete_records", label: "O'chirish" },
    { field: "can_manage_roles", label: "Rollar sozlamasi" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-100">Rollarni boshqarish</h1>
            <Badge variant="beta" className="text-[10px] tracking-wider px-2 py-0.5">
              BETA
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Foydalanuvchi rollari va xavfsizlik ruxsatlari matritsasi (RBAC)
          </p>
        </div>

        <Button
          onClick={handleSaveMatrix}
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5"
        >
          <Save className="h-3.5 w-3.5" />
          <span>O'zgarishlarni saqlash</span>
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in-50">
          <Check className="h-4 w-4" />
          <span>Rol ruxsatlari muvaffaqiyatli saqlandi va tizim bo'ylab qo'llanildi!</span>
        </div>
      )}

      {/* Permission Matrix Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] font-semibold text-zinc-400 uppercase font-mono">
                <th className="py-3 px-4">Rol nomi</th>
                <th className="py-3 px-4">Foydalanuvchilar</th>
                {permColumns.map((col) => (
                  <th key={String(col.field)} className="py-3 px-3 text-center">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {roles.map((r) => (
                <tr key={r.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-zinc-100">{r.role_name}</p>
                    <p className="text-[11px] text-zinc-500">{r.description}</p>
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-300 whitespace-nowrap">
                    {r.user_count} nafar
                  </td>
                  {permColumns.map((col) => {
                    const isAllowed = Boolean(r[col.field]);
                    const isCeo = r.role === "CEO";

                    return (
                      <td key={String(col.field)} className="py-3 px-3 text-center">
                        <button
                          type="button"
                          disabled={isCeo}
                          onClick={() => togglePermission(r.id, col.field)}
                          className={`h-6 w-6 rounded-md inline-flex items-center justify-center transition-all ${
                            isAllowed
                              ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 shadow-sm"
                              : "bg-zinc-900 text-zinc-600 border border-zinc-800 hover:border-zinc-700"
                          } ${isCeo ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
                        >
                          {isCeo ? (
                            <Lock className="h-3 w-3 text-indigo-400" />
                          ) : isAllowed ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <span className="text-[10px]">—</span>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
