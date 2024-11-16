import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Fade,
  Grow,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import { useQuery } from "react-query";
import { fetchCompletedOrder } from "../../services/productService";
import ProductDetails from "./ProductDetails";

const CompletedOrder: React.FC = () => {
  const [viewDetailsModal, setViewDetailsModal] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<any>({});

  const { data: completedOrder } = useQuery(
    "CompletedOrder",
    fetchCompletedOrder
  );

  const handleViewProduct = (order: any) => {
    setViewDetailsModal(!viewDetailsModal);
    setProductDetails(order?.products);
  };

  const onCloseViewModal = () => {
    setViewDetailsModal(!viewDetailsModal);
    setProductDetails({});
  };

  return (
    <>
      <Fade in={true} timeout={1200}>
        <Box sx={{ p: 3 }}>
          <Fade in={true} timeout={800}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Completed Orders
            </Typography>
          </Fade>

          {/* Check if there are no orders */}
          {completedOrder?.orders?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
                backgroundColor: "#e6ede6",
                borderRadius: 2,
                p: 3,
                boxShadow: 3,
                mt: 2,
              }}
            >
              <Typography variant="h5" color="textSecondary" gutterBottom>
                No Orders Available
              </Typography>
              <Typography variant="body1" color="textSecondary">
                It looks like there are no completed orders at the moment.
              </Typography>
            </Box>
          ) : (
            <Fade in={true} timeout={1500}>
              <TableContainer
                component={Paper}
                sx={{ backgroundColor: "#e6ede6", mt: 2 }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="orders table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>User Name</TableCell>
                      <TableCell>User Contact No.</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {completedOrder?.orders?.map(
                      (order: any, index: number) => (
                        <Grow
                          key={order.id}
                          in={true}
                          style={{ transformOrigin: "0 0 0" }}
                          timeout={1000 + index * 100}
                        >
                          <TableRow
                            sx={{
                              "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                                transition: "background-color 0.4s ease",
                              },
                            }}
                          >
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.user.userName}</TableCell>
                            <TableCell>{order.user.contactNumber}</TableCell>
                            <TableCell>{order.products.title}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>
                              <Chip
                                label={order.status}
                                color="success"
                                sx={{
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    transform: "scale(1.05)",
                                  },
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {new Date(order.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Tooltip title="View Product">
                                <IconButton
                                  color="primary"
                                  sx={{
                                    transition: "transform 0.2s ease",
                                    "&:hover": {
                                      transform: "scale(1.1)",
                                    },
                                  }}
                                  onClick={() => handleViewProduct(order)}
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        </Grow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Fade>
          )}
        </Box>
      </Fade>

      <ProductDetails
        productDetails={productDetails}
        onClose={onCloseViewModal}
        isOpen={viewDetailsModal}
      />
    </>
  );
};

export default CompletedOrder;
