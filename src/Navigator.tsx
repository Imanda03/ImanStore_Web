import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import PublicRoute from "./routes/PublicRouters";
import PrivateRoute from "./routes/PrivateRoutes";
import { publicRoutes, privateRoutes } from "./routes/RouteConfig";
import SidebarComponent from "./components/components/Drawer";
import { useAuth } from "./routes/AuthContext";

function Navigator() {
  const { authToken } = useAuth(); // Get token from context
  const isLoggedIn = !!authToken;
  const drawerWidth = 200;

  console.log("isLoggedIn", isLoggedIn);

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        {isLoggedIn && <SidebarComponent />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: isLoggedIn ? `${drawerWidth}px` : 0,
            transition: "margin-left 0.3s ease",
            pl: 3,
            minHeight: "100vh",
            backgroundColor: "#dcdedc",
          }}
        >
          <Routes>
            {/* Public Routes */}
            {publicRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PublicRoute isLoggedIn={isLoggedIn}>{element}</PublicRoute>
                }
              />
            ))}

            {/* Private Routes */}
            {privateRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>{element}</PrivateRoute>
                }
              />
            ))}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default Navigator;
