import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../../../assets/BackgroundImage.png";
import { useLogin } from "../../../services/api";
import { useAuth } from "../../../routes/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const { mutate: login, isLoading, isError, error } = useLogin();
  const { login: loginToGlobalState } = useAuth();

  const handleLogin = () => {
    login(
      { email, password },
      {
        onSuccess: async (data) => {
          console.log("Login successful");
          await localStorage.setItem("authToken", data.token);

          console.log(
            "first",
            await localStorage.setItem("authToken", data.token)
          );

          setSnackbarMessage("Login successful!");
          setIsSuccess(true);
          setSnackbarOpen(true); // Show success Snackbar

          // Clear the fields after login
          setEmail("");
          setPassword("");
          loginToGlobalState(data.token);

          navigate("/");
        },
        onError: (err) => {
          console.error("Login failed!", err);
          setSnackbarMessage("Login failed! Please try again.");
          setSnackbarOpen(true);
        },
      }
    );
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the Snackbar
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgroundImg})`, // Add background image
        backgroundSize: "cover", // Make the background cover the full page
        backgroundPosition: "center", // Center the background image
        position: "relative",
        zIndex: 1,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for better contrast
          zIndex: -1, // Ensure the overlay is behind the content
        },
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          backgroundColor: "rgba(63, 74, 70, 0.9)", // Semi-transparent background
          borderRadius: 2,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)", // Stronger shadow
        }}
      >
        {/* Welcome Message */}
        <Typography
          variant="h4"
          sx={{
            marginBottom: 3,
            color: "wheat",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Welcome to ImanStore
        </Typography>

        {/* Tagline */}
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: 3,
            color: "#e6e8e6",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          "Your trusted platform for premium products."
        </Typography>

        {/* Email Input */}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            marginBottom: 2,
            "& .MuiInputLabel-root": { color: "#e6e8e6" }, // Label color
            "& .MuiOutlinedInput-root": {
              color: "#e6e8e6", // Text color
              "& fieldset": {
                borderColor: "#e6e8e6", // Border color
              },
              "&:hover fieldset": {
                borderColor: "wheat", // Hover border color
              },
            },
          }}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            marginBottom: 3,
            "& .MuiInputLabel-root": { color: "#e6e8e6" },
            "& .MuiOutlinedInput-root": {
              color: "#e6e8e6",
              "& fieldset": {
                borderColor: "#e6e8e6",
              },
              "&:hover fieldset": {
                borderColor: "wheat",
              },
            },
          }}
        />

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "wheat",
            color: "#2d3b37", // Dark text on light button
            fontWeight: "bold",
            padding: "10px 0", // Increase padding for larger button
            transition: "all 0.3s ease", // Add smooth transition
            "&:hover": {
              backgroundColor: "#d8b384", // Darker wheat on hover
              transform: "scale(1.05)", // Slight button scale on hover
            },
          }}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        {/* Forgot Password link */}
        {/* <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            color: "#e6e8e6",
            textAlign: "center",
            cursor: "pointer",
            "&:hover": {
              color: "wheat", // Change color on hover
              textDecoration: "underline", // Underline on hover
            },
          }}
          onClick={() => alert("Forgot Password feature coming soon!")}
        >
          Forgot Password?
        </Typography> */}
      </Box>
      {/* Snackbar for login error */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Close after 3 seconds
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        sx={{
          backgroundColor: isSuccess ? "green" : "red", // Success: green, Error: red
          "& .MuiSnackbarContent-root": {
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: isSuccess ? "#4caf50" : "#f44336", // Snackbar's background
          },
        }}
      />
    </Box>
  );
};

export default LoginPage;
