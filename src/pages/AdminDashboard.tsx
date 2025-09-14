import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  TrendingUp,
  UserCheck,
  ClipboardList
} from "lucide-react";

const AdminSidebar = () => {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: Users, label: "Students" },
    { icon: UserCheck, label: "Mentors" },
    { icon: BookOpen, label: "Resources" },
    { icon: ClipboardList, label: "Attendance" },
    { icon: Calendar, label: "Events" },
    { icon: BarChart3, label: "Reports" },
  ];

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center space-x-2 mb-6 p-2">
        <Users className="h-6 w-6 text-primary" />
        <span className="font-semibold text-primary">College Admin</span>
      </div>
      
      {menuItems.map((item, index) => (
        <Button
          key={index}
          variant={item.active ? "default" : "ghost"}
          className="w-full justify-start"
        >
          <item.icon className="mr-3 h-4 w-4" />
          {item.label}
        </Button>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const collegeStats = [
    {
      title: "Total Students",
      value: "342",
      change: "+15 this month",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Mentors", 
      value: "12",
      change: "+2 this month",
      icon: UserCheck,
      color: "text-success"
    },
    {
      title: "Attendance Rate",
      value: "89.5%",
      change: "+3.2% this week", 
      icon: ClipboardList,
      color: "text-accent"
    },
    {
      title: "Upcoming Events",
      value: "8",
      change: "3 this week",
      icon: Calendar,
      color: "text-warning"
    }
  ];

  return (
    <DashboardLayout
      userRole="College Admin"
      userName="College Admin"
      sidebarContent={<AdminSidebar />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">College Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your college operations and monitor student progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collegeStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>Approve registrations and manage student accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Manage Students</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports</CardTitle>
              <CardDescription>View detailed attendance analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Reports</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule Events</CardTitle>
              <CardDescription>Plan workshops and college activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Create Event</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;