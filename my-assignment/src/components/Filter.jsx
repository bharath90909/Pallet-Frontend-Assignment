import { Box, Typography } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputAdornment } from "@mui/material";
import DropDown from "./DropDown";
import SearchField from "./SearchField";
import SearchIcon from "@mui/icons-material/Search";

export default function Filter({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
}) {
  const getSortDisplayText = (value) => {
    switch (value) {
      case "low-high":
        return "Low to High";
      case "high-low":
        return "High to Low";
      default:
        return "None";
    }
  };

  const getCategoryDisplayText = (value) => {
    if (!value) return "All Categories";
    return value;
  };

  return (
    <Box sx={{ mb: 4 }}>
      <SearchField
        fullWidth
        placeholder="Search by product name"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 4 },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            minWidth: { xs: "100%", sm: "auto" },
          }}
        >
          <Typography variant="body1" sx={{ minWidth: "80px" }}>
            Sort by price
          </Typography>
          <DropDown
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            sx={{
              flex: 1,
              minWidth: { xs: "auto", sm: "150px" },
            }}
            displayEmpty
            renderValue={(value) => getSortDisplayText(value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="low-high">Low to High</MenuItem>
            <MenuItem value="high-low">High to Low</MenuItem>
          </DropDown>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            minWidth: { xs: "100%", sm: "auto" },
          }}
        >
          <Typography variant="body1" sx={{ minWidth: "80px" }}>
            Category
          </Typography>
          <DropDown
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            sx={{
              flex: 1,
              minWidth: { xs: "auto", sm: "200px" },
            }}
            displayEmpty
            renderValue={(value) => getCategoryDisplayText(value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </DropDown>
        </Box>
      </Box>
    </Box>
  );
}
