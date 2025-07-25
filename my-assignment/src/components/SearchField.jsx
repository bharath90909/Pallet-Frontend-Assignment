import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "transparent",
    color: theme.palette.text.primary,
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.23)",
      borderRadius: "4px",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.23)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 255, 255, 0.23)",
    },
  },
  "& .MuiInputAdornment-root": {
    color: theme.palette.text.secondary,
  },
}));

export default SearchField;
