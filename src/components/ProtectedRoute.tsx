import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, AppRole } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: AppRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { session, profile, loading, getRedirectPathForRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!session) {
      navigate("/auth", { replace: true });
      return;
    }
    if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
      navigate(getRedirectPathForRole(profile.role), { replace: true });
    }
  }, [loading, session, profile, allowedRoles, navigate, getRedirectPathForRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;