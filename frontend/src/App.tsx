import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MaskingProvider } from "./context/MaskingContext";
import { SoffcrmHeader } from "./components/layout/SoffcrmHeader";
import { PaymentModal } from "./components/modules/PaymentModal";
import { AuditLogModal } from "./components/modules/AuditLogModal";

// Pages
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LeadsPage } from "./pages/LeadsPage";
import { MentorsPage } from "./pages/MentorsPage";
import { GroupsPage } from "./pages/GroupsPage";
import { GroupDetailsPage } from "./pages/GroupDetailsPage";
import { StudentsPage } from "./pages/StudentsPage";
import { StudentProfilePage } from "./pages/StudentProfilePage";
import { ExamsPage } from "./pages/ExamsPage";
import { FinancePage } from "./pages/FinancePage";
import { ReportsPage } from "./pages/ReportsPage";
import { RolesPage } from "./pages/RolesPage";
import { SettingsPage } from "./pages/SettingsPage";

function MainApp() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>("dashboard");
  const [settingsSubView, setSettingsSubView] = useState<string>("courses");
  const [reportSubView, setReportSubView] = useState<string>("payment");
  const [selectedBranch, setSelectedBranch] = useState<string>("INCEPTUM Filiali");

  // Sub-detail view states
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  // Modals state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAuditLogModalOpen, setIsAuditLogModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f4f6fc] flex items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-3 border-[#5d5fef] border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handleTabChange = (tab: string, subView?: string) => {
    setCurrentTab(tab);
    if (tab === "settings") {
      setSettingsSubView(subView || settingsSubView || "courses");
    }
    if (tab === "reports" && subView) {
      setReportSubView(subView);
    }

    // Reset nested views when switching main tabs
    if (tab !== "groups") setSelectedGroup(null);
    if (tab !== "students") setSelectedStudentId(null);
  };

  const renderContent = () => {
    switch (currentTab) {
      case "dashboard":
        return (
          <DashboardPage
            onNavigate={handleTabChange}
            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
          />
        );

      case "leads":
        return <LeadsPage />;

      case "mentors":
        return <MentorsPage />;

      case "groups":
        if (selectedGroup) {
          return (
            <GroupDetailsPage
              group={selectedGroup}
              onBack={() => setSelectedGroup(null)}
              onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
              onSelectStudentProfile={(id) => {
                setSelectedStudentId(id);
                setCurrentTab("students");
              }}
            />
          );
        }
        return <GroupsPage onSelectGroup={(g) => setSelectedGroup(g)} />;

      case "students":
        if (selectedStudentId) {
          return (
            <StudentProfilePage
              studentId={selectedStudentId}
              onBack={() => setSelectedStudentId(null)}
              onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
            />
          );
        }
        return (
          <StudentsPage
            onSelectStudentProfile={(id) => setSelectedStudentId(id)}
            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
          />
        );

      case "exams":
        return <ExamsPage />;

      case "finance":
        return (
          <FinancePage onOpenPaymentModal={() => setIsPaymentModalOpen(true)} />
        );

      case "reports":
        return <ReportsPage initialSubView={reportSubView} />;

      case "roles":
        return <RolesPage />;

      case "settings":
        return (
          <SettingsPage
            initialSubView={settingsSubView}
            onSubViewChange={(view: string) => setSettingsSubView(view)}
          />
        );

      default:
        return (
          <DashboardPage
            onNavigate={handleTabChange}
            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors duration-200">
      {/* 1:1 SoffCRM Top Navigation Header */}
      <SoffcrmHeader
        currentTab={currentTab}
        currentSettingsSubView={settingsSubView}
        currentReportsSubView={reportSubView}
        onTabChange={handleTabChange}
        onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
        onOpenAuditLogs={() => setIsAuditLogModalOpen(true)}
        selectedBranch={selectedBranch}
        onBranchChange={setSelectedBranch}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-6 py-5 animate-in fade-in duration-150">
        {renderContent()}
      </main>

      {/* Global Modals */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      <AuditLogModal
        isOpen={isAuditLogModalOpen}
        onClose={() => setIsAuditLogModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MaskingProvider>
        <MainApp />
      </MaskingProvider>
    </AuthProvider>
  );
}
