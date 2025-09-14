import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Shield,
  FileText,
  Calendar,
  Trophy
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const SuperAdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", path: "/super-admin" },
    { icon: Building2, label: "Manage Colleges", path: "/super-admin/colleges" },
    { icon: Users, label: "Admins & Mentors", path: "/super-admin/users" },
    { icon: BookOpen, label: "Global Resources", path: "/super-admin/resources" },
    { icon: FileText, label: "Reports & Analytics", path: "/super-admin/reports" },
    { icon: Calendar, label: "Events & Workshops", path: "/super-admin/events" },
    { icon: Trophy, label: "Competitions", path: "/super-admin/competitions" },
    { icon: Settings, label: "System Settings", path: "/super-admin/settings" },
  ];

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center space-x-2 mb-6 p-2">
        <Shield className="h-6 w-6 text-primary" />
        <span className="font-semibold text-primary">Super Admin</span>
      </div>
      
      {menuItems.map((item) => (
        <Button
          key={item.path}
          variant={location.pathname === item.path ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => navigate(item.path)}
        >
          <item.icon className="mr-3 h-4 w-4" />
          {item.label}
        </Button>
      ))}
    </div>
  );
};