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
  Modal,
  Fade,
  Grow,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useQuery, useQueryClient } from "react-query";
import {
  fetchProgressOrder,
  updateOrderStatus,
} from "../../services/productService";
import ProductDetails from "./ProductDetails";
import RefreshIcon from "@mui/icons-material/Refresh";
import ButtonComponent from "./core/Button";

const EmptyStateMessage = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    minHeight="80vh"
    bgcolor="#e6ede6"
  >
    <Box
      bgcolor="white"
      borderRadius={2}
      boxShadow={3}
      p={4}
      maxWidth={400}
      textAlign="center"
      border="1px solid"
      borderColor="grey.200"
      position="relative"
    >
      {/* Icon container */}
      <Box
        sx={{
          width: 64,
          height: 64,
          bgcolor: "blue.50",
          borderRadius: "50%",
          mx: "auto",
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          width="32"
          height="32"
          style={{ color: "#3f51b5" }}
        >
          <path
            d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -4,
            right: -4,
            width: 12,
            height: 12,
            bgcolor: "blue.200",
            borderRadius: "50%",
            animation: "pulse 1.5s infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -4,
            left: -4,
            width: 8,
            height: 8,
            bgcolor: "blue.300",
            borderRadius: "50%",
            animation: "pulse 1.5s infinite alternate",
          }}
        />
      </Box>

      {/* Text content */}
      <Box mb={3}>
        <Typography variant="h5" color="text.primary" fontWeight="bold">
          No Orders in Progress
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your orders will appear here once they're in progress.
        </Typography>
      </Box>

      {/* Action buttons */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<RefreshIcon />}
        onClick={() => window.location.reload()}
        sx={{
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        Refresh Page
      </Button>
      <Typography
        variant="caption"
        color="text.secondary"
        mt={2}
        display="block"
      >
        Last checked: {new Date().toLocaleTimeString()}
      </Typography>

      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          bgcolor: "blue.50",
          borderRadius: "50%",
          opacity: 0.2,
          transform: "translate(50%, -50%)",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 64,
          height: 64,
          bgcolor: "blue.50",
          borderRadius: "50%",
          opacity: 0.2,
          transform: "translate(-50%, 50%)",
          zIndex: -1,
        }}
      />
    </Box>
  </Box>
);

// Rest of the OrderInProgress component remains the same...
const OrderInProgress = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [viewDetailsModal, setViewDetailsModal] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<any>({});
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const queryClient = useQueryClient();

  const { data: progressOrder, isLoading } = useQuery(
    "ProgressOrder",
    fetchProgressOrder
  );
  const { mutate: updateStatus } = updateOrderStatus();

  const handleSnackbarClose = () => setOpenSnackbar(false);
  const handleViewProduct = (order: any) => {
    setViewDetailsModal(!viewDetailsModal);
    setProductDetails(order?.products);
  };
  const onCloseViewModal = () => {
    setViewDetailsModal(!viewDetailsModal);
    setProductDetails({});
  };
  const handleOpenStatusModal = (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusModalOpen(true);
  };
  const handleCloseStatusModal = () => {
    setStatusModalOpen(false);
    setSelectedOrder(null);
  };
  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewStatus(event.target.value as string);
  };
  const handleStatusUpdate = () => {
    const data = { id: selectedOrder?.id, newStatus };
    updateStatus(data, {
      onSuccess: (data) => {
        setSnackbarMessage(data.message);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setStatusModalOpen(false);
        queryClient.invalidateQueries(["ProgressOrder"]);
        queryClient.invalidateQueries(["CompletedOrder"]);
      },
      onError: () => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to update status.");
        setOpenSnackbar(true);
      },
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!progressOrder?.orders?.length) {
    return <EmptyStateMessage />;
  }

  // Rest of the component rendering (table, modals, etc.)...
  return (
    <>
      <Fade in={true} timeout={1200}>
        <Box sx={{ p: 3 }}>
          <Fade in={true} timeout={800}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Orders In Progress
            </Typography>
          </Fade>

          <Fade in={true} timeout={1500}>
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: "#e6ede6" }}
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
                  {progressOrder?.orders?.map((order: any, index: number) => (
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
                        <TableCell>{order?.id}</TableCell>
                        <TableCell>{order?.user?.userName}</TableCell>
                        <TableCell>{order?.user?.contactNumber}</TableCell>
                        <TableCell>{order?.products?.title}</TableCell>
                        <TableCell>{order?.quantity}</TableCell>
                        <TableCell>
                          <Chip
                            label={order?.status}
                            color="primary"
                            sx={{
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                            }}
                          />
                          <Tooltip title="Change Status">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenStatusModal(order)}
                              sx={{ ml: 1 }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          {new Date(order?.createdAt).toLocaleString()}
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Fade>

      <Modal open={statusModalOpen} onClose={handleCloseStatusModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 1,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Change Order Status
          </Typography>
          <Select
            value={newStatus}
            onChange={handleStatusChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled_by_admin">Cancelled</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleStatusUpdate}
          >
            Update Status
          </Button>
        </Box>
      </Modal>

      <ProductDetails
        productDetails={productDetails}
        onClose={onCloseViewModal}
        isOpen={viewDetailsModal}
      />
    </>
  );
};

export default OrderInProgress;
