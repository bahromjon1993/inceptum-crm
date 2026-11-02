import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "../types";
import { apiClient } from "../api/client";

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, pass: string) => Promise<boolean>;
  logout: () => void;
  switchRoleDemo: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS_BY_ROLE: Record<UserRole, User> = {
  CEO: {
    id: 1,
    phone_number: "+998901234567",
    first_name: "Sherzodbek",
    last_name: "Qodirov",
    full_name: "Sherzodbek Qodirov",
    role: "CEO",
    role_display: "Bosh direktor (CEO)",
    branch: "Barcha filiallar",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    permissions: {
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
  },
  ADMIN: {
    id: 2,
    phone_number: "+998902345678",
    first_name: "Madina",
    last_name: "Karimova",
    full_name: "Madina Karimova",
    role: "ADMIN",
    role_display: "Administrator",
    branch: "Chilonzor filiali",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    permissions: {
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
  },
  TEACHER: {
    id: 3,
    phone_number: "+998903456789",
    first_name: "Abduqodir",
    last_name: "Ziyodov",
    full_name: "Abduqodir Ziyodov",
    role: "TEACHER",
    role_display: "O'qituvchi",
    branch: "Chilonzor filiali",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    permissions: {
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
  },
  OPERATOR: {
    id: 4,
    phone_number: "+998904567890",
    first_name: "Nargiza",
    last_name: "Usmonova",
    full_name: "Nargiza Usmonova",
    role: "OPERATOR",
    role_display: "Operator / Qabul",
    branch: "Chilonzor filiali",
    avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    permissions: {
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
  },
  STUDENT: {
    id: 5,
    phone_number: "+998905678901",
    first_name: "Javohir",
    last_name: "Toshpo'latov",
    full_name: "Javohir Toshpo'latov",
    role: "STUDENT",
    role_display: "O'quvchi",
    branch: "Chilonzor filiali",
    avatar_url: "https://api.dicebear.com/7.x/initials/svg?seed=Javohir+Toshpolatov&backgroundColor=6366f1",
    permissions: {
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
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if access token exists
    const token = localStorage.getItem("inceptum_access_token");
    const storedUser = localStorage.getItem("inceptum_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, pass: string): Promise<boolean> => {
    try {
      const res = await apiClient.post("/auth/login/", {
        phone_number: phone,
        password: pass,
      });
      const data = res.data;
      localStorage.setItem("inceptum_access_token", data.access);
      localStorage.setItem("inceptum_refresh_token", data.refresh);
      localStorage.setItem("inceptum_user", JSON.stringify(data.user));
      setUser(data.user);
      return true;
    } catch {
      // Fallback for role mock demo credentials
      if (phone === "+998901234567") setUser(MOCK_USERS_BY_ROLE.CEO);
      else if (phone === "+998902345678") setUser(MOCK_USERS_BY_ROLE.ADMIN);
      else if (phone === "+998903456789") setUser(MOCK_USERS_BY_ROLE.TEACHER);
      else if (phone === "+998904567890") setUser(MOCK_USERS_BY_ROLE.OPERATOR);
      else setUser(MOCK_USERS_BY_ROLE.STUDENT);
      return true;
    }
  };

  const logout = () => {
    localStorage.removeItem("inceptum_access_token");
    localStorage.removeItem("inceptum_refresh_token");
    localStorage.removeItem("inceptum_user");
    setUser(null);
  };

  const switchRoleDemo = (newRole: UserRole) => {
    const newUser = MOCK_USERS_BY_ROLE[newRole];
    setUser(newUser);
    localStorage.setItem("inceptum_user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || "CEO",
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRoleDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
