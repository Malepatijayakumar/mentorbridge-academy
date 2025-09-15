import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import SuperAdminColleges from "./pages/super-admin/Colleges";
import SuperAdminUsers from "./pages/super-admin/Users";
import SuperAdminResources from "./pages/super-admin/Resources";
import SuperAdminReports from "./pages/super-admin/Reports";
import SuperAdminEvents from "./pages/super-admin/Events";
import SuperAdminCompetitions from "./pages/super-admin/Competitions";
import SuperAdminSettings from "./pages/super-admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/super-admin"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Super Admin sub-pages */}
          <Route
            path="/super-admin/colleges"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <SuperAdminColleges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/users"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <SuperAdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/resources"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <SuperAdminResources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/reports"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <SuperAdminReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/events"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <SuperAdminEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/competitions"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <SuperAdminCompetitions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/settings"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <SuperAdminSettings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor"
            element={
              <ProtectedRoute allowedRoles={["mentor"]}>
                <MentorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
