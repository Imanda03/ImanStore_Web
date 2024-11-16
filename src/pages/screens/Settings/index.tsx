import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  TextField,
  Switch,
  Button,
  Divider,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  AccountCircle as AccountIcon,
  Palette as PaletteIcon,
  PrivacyTip as PrivacyIcon,
  Language as LanguageIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const SettingsPage: React.FC = () => {
  // State for different settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [privacyModeEnabled, setPrivacyModeEnabled] = useState(false);
  const [adminEmail, setAdminEmail] = useState("admin@example.com");
  const [language, setLanguage] = useState("en");

  const handleSaveSettings = () => {
    console.log("Settings saved");
  };

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
        Settings
      </Typography>

      {/* Account Settings */}
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <AccountIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Account Settings
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <FormControl fullWidth margin="normal">
            <TextField
              label="Admin Email"
              variant="outlined"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSaveSettings}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <NotificationsIcon
              color="primary"
              fontSize="large"
              sx={{ mr: 1 }}
            />
            <Typography variant="h5" fontWeight="bold">
              Notification Settings
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Enable Notifications</Typography>
            <Switch
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSaveSettings}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <SecurityIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Security Settings
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="subtitle1">Enable Dark Mode</Typography>
            <Switch
              checked={darkModeEnabled}
              onChange={() => setDarkModeEnabled(!darkModeEnabled)}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSaveSettings}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <PrivacyIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Privacy Settings
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Enable Privacy Mode</Typography>
            <Switch
              checked={privacyModeEnabled}
              onChange={() => setPrivacyModeEnabled(!privacyModeEnabled)}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSaveSettings}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <PaletteIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Appearance Settings
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Enable Dark Mode</Typography>
            <Switch
              checked={darkModeEnabled}
              onChange={() => setDarkModeEnabled(!darkModeEnabled)}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <LanguageIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Language Settings
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value as string)}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="de">German</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSaveSettings}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <SettingsIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              System Settings
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Auto Updates</Typography>
            <Switch />
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSaveSettings}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;
