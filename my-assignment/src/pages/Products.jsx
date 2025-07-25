import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProductsContext } from "../hooks/useProductsContext";
import StyledDataGrid from "../components/StyledDataGrid";
import Filter from "../components/Filter";

const columns = [
  {
    field: "image",
    headerName: "Product Image",
    flex: 1,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      
      return (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={params.row.image_url}
            alt={params.row.name}
            style={{
              width: "90%",
              height: "90%",
              objectFit: "contain",
              borderRadius: "4px",
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "name",
    headerName: "Product Name",
    flex: 2,
    minWidth: 200,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "category",
    headerName: "Category",
    flex: 2,
    minWidth: 200,
    align: "center",
    headerAlign: "center",
  },
];


export default function Products() {
  const navigate = useNavigate();
  const { products, loading, rowCount, setCurrentPage } = useProductsContext();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

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
  }, [searchQuery, selectedCategory, sortBy, products]);

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
    setCurrentPage(newModel.page);
    setSelectedCategory("");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
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
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
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
          disableColumnSorting
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
