import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Select,
  MenuItem,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useProducts } from "./context/ProductContext";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 2,
    minWidth: 200,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 2,
    minWidth: 200,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
  },
];

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: theme.palette.text.primary,
  "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus-within":
    {
      outline: "none !important",
    },
  width: "100% !important",
  "& .MuiDataGrid-main": {
    width: "100% !important",
  },
  "& .MuiDataGrid-virtualScroller": {
    width: "100% !important",
  },
  "& .MuiDataGrid-virtualScrollerContent": {
    width: "100% !important",
  },
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    width: "100% !important",
  },
  "& .MuiDataGrid-row": {
    width: "100% !important",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.04)",
    },
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "transparent",
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
    borderTop: "1px solid rgba(255, 255, 255, 0.12)",
    fontWeight: 600,
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "none",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
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

const StyledTextField = styled(TextField)(({ theme }) => ({
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

const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  // Helper function to get display text for sort
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

  // Helper function to get display text for category
  const getCategoryDisplayText = (value) => {
    if (!value) return "All Categories";
    return value;
  };

  return (
    <Box sx={{ mb: 4 }}>
      <StyledTextField
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
          <StyledSelect
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
          </StyledSelect>
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
          <StyledSelect
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
          </StyledSelect>
        </Box>
      </Box>
    </Box>
  );
};

export default function ProductGrid() {
  const navigate = useNavigate();
  const { products, loading, rowCount, setCurrentPage } = useProducts();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  useEffect(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Apply price sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "low-high") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, products]);

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
    setCurrentPage(newModel.page);
    setSelectedCategory("");
    // setSearchTerm("");
    // setSortBy("");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleRowClick = (params) => {
    navigate(`/product/${params.row.id}`);
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        p: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: 2,
          letterSpacing: "0.05em",
          fontSize: { xs: "3rem", sm: "4rem" },
        }}
      >
        OUR PRODUCTS
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          mb: 4,
          color: "text.secondary",
          fontSize: "1.1rem",
          maxWidth: "600px",
        }}
      >
        Explore our wide range of quality grocery products
      </Typography>

      <Box sx={{ width: "100%" }}>
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />

        <StyledDataGrid
          rows={filteredProducts}
          columns={columns}
          rowCount={rowCount}
          loading={loading}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          onRowClick={handleRowClick}
          disableColumnMenu
          hideFooterSelectedRowCount
          sx={{
            height: 700,
            width: "100%",
            "& .MuiDataGrid-main": {
              width: "100%",
            },
          }}
        />
      </Box>
    </Box>
  );
}
