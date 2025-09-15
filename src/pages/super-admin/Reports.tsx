import { DashboardLayout } from "@/components/DashboardLayout";
import { SuperAdminSidebar } from "@/components/SuperAdminSidebar";

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

const SuperAdminReports = () => {
  setSEO("Reports | Super Admin", "View reports and analytics across the platform.", "/super-admin/reports");
  return (
    <DashboardLayout userRole="Super Admin" userName="Admin User" sidebarContent={<SuperAdminSidebar />}>
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
      <p className="text-muted-foreground">View platform-wide analytics and insights.</p>
    </DashboardLayout>
  );
};

export default SuperAdminReports;