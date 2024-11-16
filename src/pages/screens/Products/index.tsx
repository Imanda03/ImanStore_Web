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
  Button,
  TextField,
  Chip,
  Tab,
  Tabs,
  Modal,
  Fade,
  Grow,
  Avatar,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import ModalComponent from "../../../components/components/core/CustomModal";
import CustomForm from "../../../components/components/core/FormComponent";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { fetchCategory } from "../../../services/categoryService";
import {
  deleteProduct,
  fetchProduct,
  updateProduct,
  useProduct,
} from "../../../services/productService";
import ProductDetails from "../../../components/components/ProductDetails";

const ProductPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [productToEdit, setProductToEdit] = useState<any>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<any>({});
  const [viewDetailsModal, setViewDetailsModal] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const { data: categoryData } = useQuery("categories", fetchCategory);

  const { mutate: addProduct, isLoading, isError, error } = useProduct();
  const { mutate: editProduct } = updateProduct();
  const { mutate: deleteProductMutation } = deleteProduct();

  const selectedData = categoryData?.categories?.map((category: any) => ({
    label: category.title,
    value: category.id,
  }));

  const formFields = [
    {
      name: "title",
      label: "Product Name",
      validation: { required: "Product Name is required." },
    },
    {
      name: "category_id",
      label: "Category",
      type: "dropdown",
      data: selectedData,
      validation: { required: "Please select Category." },
    },
    {
      name: "images",
      label: "Images",
      acceptMultipleFiles: true,
      type: "file",
      validation: {
        required: "Please upload at least one image",
      },
    },
    {
      name: "description",
      label: "Description",
      type: "textbox",
      validation: { required: "Add the description about the project." },
    },
    {
      name: "price",
      label: "Price",
      validation: { required: "Price of product is required." },
    },
    {
      name: "quantity",
      label: "Quantity",
      validation: { required: "Add the quantity is required." },
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const queryClient = useQueryClient();

  const { data: productData } = useQuery("products", fetchProduct);
  console.log("productData", productData);

  const filteredProducts = productData?.products?.filter((product: any) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category.title === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  console.log("filter", filteredProducts);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit("");
    setIsEditing(false);
  };

  const handleChipClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAllProductsClick = () => {
    setSelectedCategory(null);
  };

  const getCategoriesWithCounts = (products: any) => {
    const categoryCountMap = new Map();

    products.forEach((product: any) => {
      const category = product.category;
      if (categoryCountMap.has(category)) {
        categoryCountMap.set(category, categoryCountMap.get(category) + 1);
      } else {
        categoryCountMap.set(category, 1);
      }
    });

    // Convert the Map to an array of Category objects
    const categories = Array.from(categoryCountMap.entries()).map(
      ([name, count]) => ({
        name,
        count,
      })
    );

    return categories;
  };

  const handleSubmit = (data: any) => {
    if (isEditing) {
      editProduct(data, {
        onSuccess: (data) => {
          setSnackbarMessage(data.message);
          setIsSuccess(true);
          setSnackbarOpen(true);
          setIsModalOpen(false);
          setIsEditing(false);
          queryClient.invalidateQueries({
            queryKey: ["products"],
            exact: true,
          });
        },
        onError: (err) => {
          console.error("add category", err);
          setSnackbarMessage("Failed to add product.");
          setSnackbarOpen(true);
          setIsEditing(false);
        },
      });
      return;
    } else {
      addProduct(data, {
        onSuccess: (data) => {
          setSnackbarMessage("Product Added Successfully!");
          setIsSuccess(true);
          setSnackbarOpen(true);
          setIsModalOpen(false);
          setIsEditing(false);
          queryClient.invalidateQueries({
            queryKey: ["products"],
            exact: true,
          });
        },
        onError: (err) => {
          console.error("add category", err);
          setSnackbarMessage("Failed to add product.");
          setSnackbarOpen(true);
          setIsEditing(false);
        },
      });
    }
  };

  const getUniqueCategoryWithProducts = (categories: any, products: any) => {
    const uniqueCategoryIds = [
      ...new Set(products?.map((product: any) => product?.category_id)),
    ];

    const uniqueCategories = categories?.filter((category: any) =>
      uniqueCategoryIds.includes(category?.id)
    );

    return uniqueCategories;
  };

  const handleViewProduct = (productId: string) => {
    console.log("View Product", productId);
    const product = productData?.products?.find(
      (product: any) => product.id === productId
    );

    setViewDetailsModal(!viewDetailsModal);
    setProductDetails(product);
    // Implement view logic (open product details page/modal)
  };

  const handleEditProduct = (productId: string) => {
    const product = productData?.products?.find(
      (product: any) => product.id === productId
    );
    setProductToEdit(product);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleDeleteProduct = (productId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      // Proceed with deletion if confirmed
      deleteProductMutation(productId, {
        onSuccess: () => {
          setSnackbarMessage("Product deleted successfully!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          queryClient.invalidateQueries({
            queryKey: ["products"],
            exact: true,
          });
        },
        onError: (err: any) => {
          setSnackbarMessage("Error deleting product!");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        },
      });
    } else {
      console.log("Product deletion cancelled");
    }
  };

  const onCloseViewModal = () => {
    setViewDetailsModal(!viewDetailsModal);
    setProductDetails({});
  };

  return (
    <>
      <Fade in={true} timeout={1000}>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4">Products</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#4f5d52",
                "&:hover": { backgroundColor: "#36463d" },
              }}
              onClick={handleOpenModal}
            >
              Add Products
            </Button>
          </Box>

          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="All Products" />
          </Tabs>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              <Chip
                label={`All ${productData?.products?.length}`}
                sx={{ mr: 1 }}
                onClick={handleAllProductsClick}
              />
              {getUniqueCategoryWithProducts(
                categoryData?.categories,
                productData?.products
              ) &&
                getUniqueCategoryWithProducts(
                  categoryData?.categories,
                  productData?.products
                ).map((item: any, index: number) => (
                  <Chip
                    key={index}
                    label={`${item.title} `}
                    sx={{ mr: 1 }}
                    onClick={() => handleChipClick(item.title)}
                  />
                ))}
            </Box>
            <TextField
              size="small"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          <TableContainer component={Paper} sx={{ backgroundColor: "#e6ede6" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Products</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  {/* <TableCell>Status</TableCell> */}
                  <TableCell>Quantity</TableCell>
                  {/* <TableCell>Total Revenue</TableCell> */}
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts?.map((product: any, index: number) => (
                  <Grow
                    in={true}
                    style={{ transformOrigin: "0 0 0" }}
                    timeout={1000 + index * 100}
                    key={product.id}
                  >
                    <TableRow>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={product.images[0]}
                            alt={product.name}
                            sx={{ mr: 2 }}
                          />
                          <Typography>{product.title}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.category.title}</TableCell>

                      {/* <TableCell>
                      <Chip
                        label={product.status}
                        color={
                          product.status === "Published"
                          ? "success"
                          : product.status === "Draft"
                          ? "default"
                          : "error"
                          }
                          size="small"
                          />
                          </TableCell> */}
                      <TableCell>{product.quantity}</TableCell>
                      {/* <TableCell>{1000}</TableCell> */}
                      <TableCell>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleViewProduct(product.id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </Grow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <ModalComponent
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            showFooter={false}
            title={isEditing ? "Edit Product" : "Add New Product"}
          >
            <CustomForm
              fields={formFields}
              btnName={isEditing ? "Update Product" : "Add Product"}
              onSubmit={handleSubmit}
              initialValues={productToEdit}
              btnAlign="right"
            />
          </ModalComponent>
        </Box>
      </Fade>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Close after 3 seconds
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        sx={{
          backgroundColor: isSuccess ? "green" : "red", // Success: green, Error: red
          "& .MuiSnackbarContent-root": {
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: isSuccess ? "#4caf50" : "#f44336", // Snackbar's background
          },
        }}
      />
      <ProductDetails
        productDetails={productDetails}
        onClose={onCloseViewModal}
        isOpen={viewDetailsModal}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSnackbar(false);
          }}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductPage;
