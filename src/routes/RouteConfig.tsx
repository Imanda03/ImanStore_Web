import LoginPage from "../pages/auth/LoginPage";
import NotFoundPage from "../pages/auth/NotFound";
import CategoriesPage from "../pages/screens/Categories";
import Dashboard from "../pages/screens/Dashboard";
import ProductPage from "../pages/screens/Products";
import SalesPage from "../pages/screens/Sales";
import SettingsPage from "../pages/screens/Settings";

export const publicRoutes = [
  { path: "/", element: <LoginPage /> },
  { path: "*", element: <NotFoundPage /> },
];

export const privateRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/category", element: <CategoriesPage /> },
  { path: "/product", element: <ProductPage /> },
  { path: "/sales", element: <SalesPage /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "*", element: <NotFoundPage /> },
];
