import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  Calendar, 
  Trophy, 
  Users,
  FileText,
  ClipboardCheck,
  TrendingUp,
  Play
} from "lucide-react";

const StudentSidebar = () => {
  const menuItems = [
    { icon: GraduationCap, label: "Dashboard", active: true },
    { icon: Video, label: "Live Classes" },
    { icon: BookOpen, label: "Course Materials" },
    { icon: ClipboardCheck, label: "Quizzes" },
    { icon: Trophy, label: "My Progress" },
    { icon: Calendar, label: "Schedule" },
    { icon: Users, label: "Study Groups" },
    { icon: FileText, label: "Assignments" },
  ];

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center space-x-2 mb-6 p-2">
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="font-semibold text-primary">Student Portal</span>
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

const StudentDashboard = () => {
  const studentStats = [
    {
      title: "Attendance Rate",
      value: "94.2%",
      change: "+2.1% this week",
      icon: ClipboardCheck,
      color: "text-success"
    },
    {
      title: "Courses Enrolled", 
      value: "6",
      change: "2 active",
      icon: BookOpen,
      color: "text-primary"
    },
    {
      title: "Quiz Average",
      value: "87.5%",
      change: "+5.2% this month", 
      icon: Trophy,
      color: "text-accent"
    },
    {
      title: "Study Hours",
      value: "32h",
      change: "This week",
      icon: Calendar,
      color: "text-warning"
    }
  ];

  const upcomingClasses = [
    { subject: "Data Structures", mentor: "Dr. Smith", time: "10:00 AM", status: "live" },
    { subject: "Web Development", mentor: "Prof. Johnson", time: "2:00 PM", status: "upcoming" },
    { subject: "Database Systems", mentor: "Dr. Brown", time: "4:00 PM", status: "upcoming" },
  ];

  const courses = [
    { name: "Data Structures & Algorithms", progress: 75, nextClass: "Tomorrow 10:00 AM" },
    { name: "Web Development", progress: 60, nextClass: "Today 2:00 PM" },
    { name: "Database Management", progress: 45, nextClass: "Friday 4:00 PM" },
  ];

  return (
    <DashboardLayout
      userRole="Student"
      userName="Alex Johnson"
      sidebarContent={<StudentSidebar />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
          <p className="text-muted-foreground mt-2">
            Continue your learning journey and track your progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentStats.map((stat) => (
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Classes */}
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
                        <div className="text-sm text-muted-foreground">{cls.mentor}</div>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-3">
                      <div className="text-sm font-medium">{cls.time}</div>
                      <Badge variant={cls.status === 'live' ? 'default' : 'secondary'}>
                        {cls.status === 'live' ? 'Live Now' : 'Upcoming'}
                      </Badge>
                      <Button size="sm">
                        {cls.status === 'live' ? (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            Join
                          </>
                        ) : (
                          'Prepare'
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Track your learning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-sm">{course.name}</div>
                      <div className="text-sm text-muted-foreground">{course.progress}%</div>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Next class: {course.nextClass}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-medium mb-1">Study Materials</div>
              <div className="text-sm text-muted-foreground mb-3">Access course resources</div>
              <Button variant="outline" size="sm">Browse</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <ClipboardCheck className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="font-medium mb-1">Take Quiz</div>
              <div className="text-sm text-muted-foreground mb-3">Test your knowledge</div>
              <Button variant="outline" size="sm">Start Quiz</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="font-medium mb-1">Study Groups</div>
              <div className="text-sm text-muted-foreground mb-3">Connect with peers</div>
              <Button variant="outline" size="sm">Join</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Trophy className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="font-medium mb-1">Achievements</div>
              <div className="text-sm text-muted-foreground mb-3">View your badges</div>
              <Button variant="outline" size="sm">View All</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;