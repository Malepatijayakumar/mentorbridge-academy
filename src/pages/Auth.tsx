import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

const setSEO = (title: string, description: string, path: string) => {
  document.title = title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", description);
  else {
    const m = document.createElement("meta");
    m.name = "description";
    m.content = description;
    document.head.appendChild(m);
  }
  const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (canonicalLink) canonicalLink.href = window.location.origin + path;
  else {
    const l = document.createElement("link");
    l.setAttribute("rel", "canonical");
    l.setAttribute("href", window.location.origin + path);
    document.head.appendChild(l);
  }
};

const Auth = () => {
  const { toast } = useToast();
  const { signIn, signUpStudent, profile, session, getRedirectPathForRole } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setSEO("Login | EdTech Platform", "Sign in or register as a student on the EdTech platform.", "/auth");
  }, []);

  useEffect(() => {
    if (session && profile) {
      navigate(getRedirectPathForRole(profile.role), { replace: true });
    }
  }, [session, profile, navigate, getRedirectPathForRole]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!" });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error, data } = await signUpStudent(email, password, firstName, lastName);
    if (error) {
      toast({ title: "Registration failed", description: error.message, variant: "destructive" });
    } else {
      const needsConfirm = !!data?.user && !data.user.confirmed_at;
      toast({ title: needsConfirm ? "Check your email" : "Registration successful", description: needsConfirm ? "We sent you a confirmation link." : "You can now sign in." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to EdTech</CardTitle>
          <CardDescription>Sign in or register (students only)</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form className="space-y-4" onSubmit={handleSignIn}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <div className="mb-4 text-sm text-muted-foreground">Only students are allowed to register. Mentors and Admins are created by Super Admin.</div>
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="space-y-2">
                  <Label htmlFor="first_name">First name</Label>
                  <Input id="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last name</Label>
                  <Input id="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg_email">Email</Label>
                  <Input id="reg_email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg_password">Password</Label>
                  <Input id="reg_password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">Register as Student</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;