import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  Video,
  ClipboardCheck,
  MessageSquare,
  TrendingUp
} from "lucide-react";

const MentorSidebar = () => {
  const menuItems = [
    { icon: BookOpen, label: "Dashboard", active: true },
    { icon: Video, label: "Live Classes" },
    { icon: FileText, label: "Course Materials" },
    { icon: ClipboardCheck, label: "Quizzes" },
    { icon: Users, label: "My Students" },
    { icon: Calendar, label: "Schedule" },
    { icon: MessageSquare, label: "Messages" },
  ];

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center space-x-2 mb-6 p-2">
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="font-semibold text-primary">Mentor Portal</span>
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

const MentorDashboard = () => {
  const mentorStats = [
    {
      title: "My Students",
      value: "85",
      change: "+5 this month",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Classes This Week", 
      value: "12",
      change: "3 upcoming",
      icon: Video,
      color: "text-success"
    },
    {
      title: "Avg Attendance",
      value: "92.3%",
      change: "+1.2% this week", 
      icon: ClipboardCheck,
      color: "text-accent"
    },
    {
      title: "Materials Shared",
      value: "24",
      change: "6 this month",
      icon: FileText,
      color: "text-warning"
    }
  ];

  const upcomingClasses = [
    { subject: "Data Structures", time: "10:00 AM", students: 28, status: "upcoming" },
    { subject: "Web Development", time: "2:00 PM", students: 32, status: "today" },
    { subject: "Database Systems", time: "4:00 PM", students: 25, status: "upcoming" },
  ];

  return (
    <DashboardLayout
      userRole="Mentor"
      userName="Dr. Sarah Johnson"
      sidebarContent={<MentorSidebar />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mentor Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your classes, track student progress, and share knowledge.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentorStats.map((stat) => (
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

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Classes</CardTitle>
            <CardDescription>Your scheduled classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((cls, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{cls.subject}</div>
                      <div className="text-sm text-muted-foreground">{cls.students} students</div>
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-3">
                    <div className="text-sm font-medium">{cls.time}</div>
                    <Badge variant={cls.status === 'today' ? 'default' : 'secondary'}>
                      {cls.status === 'today' ? 'Starting Soon' : 'Scheduled'}
                    </Badge>
                    <Button size="sm">
                      {cls.status === 'today' ? 'Start Class' : 'Prepare'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Materials</CardTitle>
              <CardDescription>Share notes, presentations, and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Upload Files</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create Quiz</CardTitle>
              <CardDescription>Design assessments for your students</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">New Quiz</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
              <CardDescription>Track student participation</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Take Attendance</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorDashboard;