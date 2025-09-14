import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoleCard } from "@/components/RoleCard";
import { Shield, Users, BookOpen, GraduationCap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: "super-admin",
      title: "Super Admin",
      description: "Training institute owner with full system access",
      icon: Shield,
      route: "/super-admin"
    },
    {
      id: "admin",
      title: "Admin",
      description: "College manager with college-specific access",
      icon: Users,
      route: "/admin"
    },
    {
      id: "mentor",
      title: "Mentor",
      description: "Educator conducting classes and evaluating students",
      icon: BookOpen,
      route: "/mentor"
    },
    {
      id: "student",
      title: "Student",
      description: "Learner accessing courses and tracking progress",
      icon: GraduationCap,
      route: "/student"
    }
  ];

  const handleRoleSelect = (role: any) => {
    setSelectedRole(role.id);
    // Simulate login flow - in real app this would handle authentication
    navigate(role.route);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
                Professional EdTech Platform
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Enterprise-grade education management system connecting institutes, colleges, mentors, and students in a seamless learning ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Modern EdTech Platform" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Role
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your role to access the appropriate dashboard and features tailored to your responsibilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                title={role.title}
                description={role.description}
                icon={role.icon}
                onClick={() => handleRoleSelect(role)}
                className={selectedRole === role.id ? "ring-2 ring-primary" : ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Platform Features
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Attendance Tracking</CardTitle>
                <CardDescription>
                  Automatic, QR code, and manual attendance marking with comprehensive reports
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Learning Management</CardTitle>
                <CardDescription>
                  Notes sharing, quiz creation, live classes, and progress tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>
                  Comprehensive analytics dashboard with role-based insights
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">
            © 2024 EduPlatform. Professional EdTech Solution.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;