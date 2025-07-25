import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

const DropDown = styled(Select)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.23)",
    borderRadius: "4px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.23)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.23)",
  },
  "& .MuiSelect-icon": {
    color: theme.palette.text.primary,
  },
}));

export default DropDown;
