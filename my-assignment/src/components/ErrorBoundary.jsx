import { Box, Typography, Button } from "@mui/material";
import { useRouteError, useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        backgroundColor: "background.default",
        p: 2,
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 60,
          color: "error.main",
          mb: 2,
        }}
      />

      <Typography
        variant="h4"
        sx={{
          color: "text.primary",
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: 1,
          textAlign: "center",
        }}
      >
        Oops! Something went wrong
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontFamily: "'Comfortaa', cursive",
          textAlign: "center",
          maxWidth: "600px",
          mb: 2,
        }}
      >
        {error?.message ||
          "We're having trouble loading this page. Please try again."}
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => window.location.reload()}
          sx={{
            color: "text.primary",
            borderColor: "divider",
            "&:hover": {
              borderColor: "text.primary",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          Try Again
        </Button>

        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "text.primary",
            color: "background.default",
            "&:hover": {
              backgroundColor: "text.secondary",
            },
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorBoundary;
