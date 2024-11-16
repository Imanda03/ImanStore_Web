import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PublicRouteProps {
  isLoggedIn: boolean;
  children: ReactNode;
}

const PublicRoute = ({ isLoggedIn, children }: PublicRouteProps) => {
  return isLoggedIn ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default PublicRoute;
