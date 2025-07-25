import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export default function StarRating() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        mb: 3,
      }}
    >
      {[...Array(3)].map((_, index) => (
        <StarIcon
          key={`filled-${index}`}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "1.8rem",
          }}
        />
      ))}
      {[...Array(2)].map((_, index) => (
        <StarOutlineIcon
          key={`outline-${index}`}
          sx={{
            color: "rgba(255, 255, 255, 0.3)",
            fontSize: "1.8rem",
          }}
        />
      ))}
    </Box>
  );
}
