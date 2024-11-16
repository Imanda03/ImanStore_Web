import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PrivateRouteProps {
  isLoggedIn: boolean;
  children: ReactNode;
}

const PrivateRoute = ({ isLoggedIn, children }: PrivateRouteProps) => {
  return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
