import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { useProducts } from "./context/ProductContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import dummyProduct from "./assets/dummyImages/dummy-product.png";

const StarRating = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        mb: 3,
      }}
    >
      {[1, 2, 3].map((_, index) => (
        <StarIcon
          key={`filled-${index}`}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "1.8rem",
          }}
        />
      ))}
      {[1, 2].map((_, index) => (
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
};

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography variant="h4">Product not found</Typography>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "text.primary",
              borderColor: "divider",
              "&:hover": {
                borderColor: "text.primary",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Back to Products
          </Button>
        </Box>
      </Container>
    );
  }

  const displayUrl = product.image_url || dummyProduct;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Button
        component={Link}
        to="/"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: 6,
          color: "text.primary",
          borderColor: "divider",
          "&:hover": {
            borderColor: "text.primary",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        }}
      >
        Back to Products
      </Button>

      <Box
        sx={{
          display: "flex",
          gap: 8,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            aspectRatio: "1",
            position: "relative",
            overflow: "hidden",
            borderRadius: 2,
            bgcolor: "rgba(255, 255, 255, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <img
            src={displayUrl}
            alt={product.name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "normal",
              letterSpacing: 1,
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: "text.secondary",
              fontWeight: "normal",
            }}
          >
            ₹{product.price}
          </Typography>

          <StarRating />

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              display: "flex",
              gap: 1,
            }}
          >
            <span style={{ color: "text.primary" }}>Category:</span>
            {product.category}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              display: "flex",
              gap: 1,
            }}
          >
            <span style={{ color: "text.primary" }}>Description:</span>
            {product?.description || "No description available"}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
