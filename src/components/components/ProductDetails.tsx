import React from "react";
import Modal from "@mui/material/Modal";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ArrowBackIosNew, ArrowForwardIos, Close } from "@mui/icons-material";
import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import ModalComponent from "./core/CustomModal";

interface Category {
  id: number;
  title: string;
}

interface ProductInterface {
  id: number;
  title: string;
  images: string[];
  category_id: number;
  description: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

interface ProductDetailsProps {
  productDetails: ProductInterface;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  productDetails,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="product-modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          overflowY: "auto",
          maxHeight: "80vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            bgcolor: "#2d3b37",
            color: "primary.contrastText",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        >
          <Typography id="product-modal-title" variant="h5">
            {productDetails.title}
          </Typography>
          <Button
            onClick={onClose}
            variant="text"
            sx={{ color: "primary.contrastText" }}
          >
            <Close />
          </Button>
        </Box>

        <Grid container spacing={4} sx={{ p: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <div
                className="slide-container"
                style={{ marginBottom: 16, textAlign: "center" }}
              >
                {productDetails?.images?.length > 1 ? (
                  <Slide
                    transitionDuration={500}
                    indicators={true}
                    prevArrow={
                      <div className="slide-arrow slide-arrow-prev">
                        <ArrowBackIosNew color="inherit" />
                      </div>
                    }
                    nextArrow={
                      <div className="slide-arrow slide-arrow-next">
                        <ArrowForwardIos color="inherit" />
                      </div>
                    }
                  >
                    {productDetails?.images?.map((image, index) => (
                      <div key={index}>
                        <CardMedia
                          component="img"
                          height="400"
                          image={image}
                          alt={`Slide ${index + 1}`}
                        />
                      </div>
                    ))}
                  </Slide>
                ) : (
                  <CardMedia
                    component="img"
                    height="400"
                    image={productDetails?.images?.[0]}
                    alt="Product"
                  />
                )}
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  <strong>Category:</strong> {productDetails?.category?.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {productDetails?.description}
                </Typography>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Rs.{productDetails?.price}
                </Typography>
              </CardContent>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ ml: "1%" }}
              >
                <strong>Quantity:</strong> {productDetails?.quantity}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ProductDetails;
