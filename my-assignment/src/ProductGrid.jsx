import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Select,
  MenuItem,
  Box,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 500,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "price",
    headerName: "Price",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "category",
    headerName: "Category",
    width: 500,
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
  "& .MuiDataGrid-row": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: `2px solid ${theme.palette.divider}`,
  },
  "& .MuiDataGrid-toolbarContainer": {
    color: theme.palette.text.primary,
    "& .MuiButton-root": {
      color: theme.palette.text.primary,
    },
  },
  "& .MuiSelect-select, & .MuiSelect-icon": {
    color: theme.palette.text.primary,
  },
  "& .MuiInputBase-root": {
    color: theme.palette.text.primary,
  },
}));

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        marginBottom: 2,
        width: "100%",
      }}
    >
      <Typography
        variant="body1"
        sx={{ color: (theme) => theme.palette.text.primary }}
      >
        Category
      </Typography>
      <Select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        displayEmpty
        style={{ width: 200 }}
        sx={{
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.23)",
          },
        }}
      >
        <MenuItem value="">
          <em>All Categories</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [sortModel, setSortModel] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(
        `/cms/products?page=${paginationModel.page + 1}`
      );
      const data = await response.json();

      const productsWithId = data.products.map((p, index) => ({
        id: p.id !== null ? p.id : `${paginationModel.page}-${index}`,
        name: p.name,
        price: p.mrp ? p.mrp.mrp : 0,
        category: p.main_category,
      }));

      const uniqueCategories = [
        ...new Set(productsWithId.map((p) => p.category)),
      ];
      setCategories(uniqueCategories);
      setAllProducts(productsWithId);
      setProducts(productsWithId);
      setRowCount(parseInt(data.totalResults, 10));
      setLoading(false);
    };

    fetchProducts();
  }, [paginationModel]);

  useEffect(() => {
    let filteredProducts = [...allProducts];

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === selectedCategory
      );
    }

    if (sortModel.length > 0) {
      const { field, sort } = sortModel[0];
      filteredProducts.sort((a, b) => {
        if (a[field] < b[field]) {
          return sort === "asc" ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return sort === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setProducts(filteredProducts);
  }, [selectedCategory, sortModel, allProducts]);

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
    setSelectedCategory(""); // Reset category filter
  };

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box sx={{ height: 700, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </Box>
      <StyledDataGrid
        rows={products}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        sortingMode="client"
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        components={{
          Toolbar: () => (
            <div style={{ padding: 10 }}>
              <GridToolbar />
            </div>
          ),
        }}
      />
    </Box>
  );
}
