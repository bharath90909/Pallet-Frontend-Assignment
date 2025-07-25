import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { useProducts } from "./context/ProductContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
            "& img": {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }}
        >
          <img src="https://placehold.co/800x800/111/333" alt={product.name} />
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
            variant="h3"
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
        </Box>
      </Box>
    </Container>
  );
}
