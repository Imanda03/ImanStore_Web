import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ButtonComponent from "../../../components/components/core/Button";

const NotFoundPage = () => {
  console.log("akjdnksaj");
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        // backgroundColor: "#7b8a7b",
        padding: 4,
      }}
    >
      {/* Animation Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center" }}
      >
        {/* Error Text */}
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "4rem", md: "6rem" },
            color: "#4f5d52",
          }}
        >
          404
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "#7c9182",
            mb: 3,
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            fontWeight: "600",
          }}
        >
          Oops! The page you're looking for doesn't exist.
        </Typography>

        {/* Animation for 404 visual */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{
            y: {
              duration: 0.8,
              yoyo: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <img
            src="https://media2.giphy.com/media/26gJyEBhfuz3ncQfu/giphy.gif?cid=6c09b95297smjw1ir0kengub2a9k7uzhokq9qn3jrly9i4kg&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g"
            alt="Lost"
            style={{
              maxWidth: "100%",
              height: "auto",
              marginBottom: "20px",
              borderRadius: 10,
            }}
          />
        </motion.div>

        {/* Back to Home Button */}
        <Link to="/" style={{ textDecoration: "none" }}>
          {/* <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 3,
              backgroundColor: "#4f5d52",
              "&:hover": { backgroundColor: "#36463d" },
            }}
          >
            Go Back Home
          </Button> */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4f5d52",
              "&:hover": { backgroundColor: "#36463d" },
            }}
          >
            Go Back Home
          </Button>
        </Link>
      </motion.div>
    </Box>
  );
};

export default NotFoundPage;
