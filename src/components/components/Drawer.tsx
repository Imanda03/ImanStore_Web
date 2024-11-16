import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LogoImg from "../../assets/appLogo.png";
import Title from "./core/Text";
import {
  CategoryIcon,
  DashboardIcon,
  ProductionQuantityLimitsIcon,
  SecurityIcon,
  SettingsIcon,
  TrendingUpIcon,
  LogoutIcon,
} from "./core/Icons";
import { useAuth } from "../../routes/AuthContext";

// Icons for the menu
const menuIcons: any = {
  Overview: <DashboardIcon fontSize="small" />,
  Categories: <CategoryIcon fontSize="small" />,
  Products: <ProductionQuantityLimitsIcon fontSize="small" />,
  Orders: <TrendingUpIcon fontSize="small" />,
};

const menuItems = [
  { text: "Overview", path: "/" },
  // { text: "Categories", path: "/category" },
  { text: "Products", path: "/product" },
  { text: "Orders", path: "/sales" },
];

const generalIcon: any = {
  Settings: <SettingsIcon fontSize="small" />,
  Security: <SecurityIcon fontSize="small" />,
};

const SidebarComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  // Logout function
  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        width: 200,
        backgroundColor: "#2d3b37",
        height: "100vh",
        padding: 2,
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Adjust layout to make room for the logout button at the bottom
      }}
    >
      <Box>
        {/* Header with logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginBottom: 2,
            mb: 5,
          }}
        >
          <img src={LogoImg} alt="logo" height="30" />
          <Title
            content="ImanStore"
            variant="subtitle1"
            color="wheat"
            weight="700"
          />
        </Box>

        {/* Menu Section */}
        <Box sx={{ marginBottom: 1 }}>
          <Title
            content="MENU"
            variant="subtitle2"
            fontSize={10}
            weight="600"
            color="#e6e8e6"
          />
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor:
                    location.pathname === item.path ? "#4f5d52" : "transparent",
                  borderLeft:
                    location.pathname === item.path
                      ? "5px solid #e6e8e6"
                      : "none",
                  color: "whiteSmoke",
                  "&:hover": {
                    backgroundColor: "#4f5d52", // Hover effect
                  },
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {menuIcons[item.text]}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ color: "inherit", ml: -2 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* General Section */}
        <Box sx={{ marginBottom: 1, marginTop: 2 }}>
          <Title
            content="GENERAL"
            variant="subtitle2"
            fontSize={10}
            weight="600"
            color="#e6e8e6"
          />
        </Box>
        <List>
          {["Settings"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor:
                    location.pathname === `/${text.toLowerCase()}`
                      ? "#4f5d52"
                      : "transparent",
                  borderLeft:
                    location.pathname === `/${text.toLowerCase()}`
                      ? "5px solid #e6e8e6"
                      : "none",
                  color: "whiteSmoke",
                  "&:hover": {
                    backgroundColor: "#4f5d52",
                  },
                }}
                onClick={() => handleNavigation(`/${text.toLowerCase()}`)}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {generalIcon[text]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ color: "inherit", fontWeight: "bold", ml: -2 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Button */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              mb: 2,
              backgroundColor: "transparent",
              color: "whiteSmoke",
              "&:hover": {
                backgroundColor: "#4f5d52",
              },
              alignItems: "center",
            }}
            onClick={handleLogout}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{ color: "inherit", fontWeight: "bold", ml: -2 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SidebarComponent;
