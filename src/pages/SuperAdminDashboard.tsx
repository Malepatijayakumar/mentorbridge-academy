import { DashboardLayout } from "@/components/DashboardLayout";
import { SuperAdminSidebar } from "@/components/SuperAdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  BookOpen, 
  BarChart3, 
  TrendingUp,
  AlertCircle,
  Plus
} from "lucide-react";

const SuperAdminDashboard = () => {
  const stats = [
    {
      title: "Total Colleges",
      value: "24",
      change: "+3 this month",
      icon: Building2,
      color: "text-primary"
    },
    {
      title: "Active Students", 
      value: "2,847",
      change: "+12% this month",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Total Mentors",
      value: "156",
      change: "+8 this month", 
      icon: BookOpen,
      color: "text-accent"
    },
    {
      title: "Avg Attendance",
      value: "87.2%",
      change: "+2.3% this week",
      icon: BarChart3,
      color: "text-warning"
    }
  ];

  const recentActivities = [
    {
      type: "New College",
      title: "Tech Institute Mumbai added",
      time: "2 hours ago",
      status: "success"
    },
    {
      type: "System Alert",
      title: "Low attendance alert for XYZ College",
      time: "4 hours ago", 
      status: "warning"
    },
    {
      type: "New Mentor",
      title: "5 new mentors onboarded",
      time: "1 day ago",
      status: "info"
    }
  ];

  return (
    <DashboardLayout
      userRole="Super Admin"
      userName="Admin User"
      sidebarContent={<SuperAdminSidebar />}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Super Admin</h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening across your education network today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
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

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add New College</span>
              </CardTitle>
              <CardDescription>
                Expand your network by onboarding a new college
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Create College</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Manage Users</span>
              </CardTitle>
              <CardDescription>
                Add admins and mentors to your colleges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Manage Users</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>View Reports</span>
              </CardTitle>
              <CardDescription>
                Comprehensive analytics across all colleges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Analytics</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from across your network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-muted-foreground">{activity.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={
                        activity.status === 'success' ? 'default' : 
                        activity.status === 'warning' ? 'destructive' : 'secondary'
                      }
                    >
                      {activity.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;