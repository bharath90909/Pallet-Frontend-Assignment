import { Box, CircularProgress, Typography } from "@mui/material";

const Spinner = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        backgroundColor: "background.default",
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          color: "text.primary",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />
    </Box>
  );
};

export default Spinner;
