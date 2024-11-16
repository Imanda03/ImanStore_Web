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
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import ButtonComponent from "../../../components/components/core/Button";
import CustomForm from "../../../components/components/core/FormComponent";
import ModalComponent from "../../../components/components/core/CustomModal";
import { fetchCategory, useCategory } from "../../../services/categoryService";
import { useQuery } from "react-query";

const CategoryPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: category, isLoading, isError, error } = useCategory();

  const { data: categoryData } = useQuery("categories", fetchCategory);

  console.log("cate", categoryData);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const formFields = [
    {
      name: "title",
      label: "Category Title",
      validation: { required: "Field is required." },
    },
  ];

  const handleChipClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAllProductsClick = () => {
    setSelectedCategory(null);
  };

  const handleFormSubmit = (data: any) => {
    const formattedTitle = data.title.toLowerCase().replace(/\s+/g, "");
    const combinedValues = {
      title: data.title,
      value: formattedTitle,
    };

    category(combinedValues, {
      onSuccess: (data) => {
        setSnackbarMessage("Category Added Successfully!");
        setIsSuccess(true);
        setSnackbarOpen(true);
        setIsModalOpen(false);
      },
      onError: (err) => {
        console.error("add category", err);
        setSnackbarMessage("Failed to add category.");
        setSnackbarOpen(true);
      },
    });
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
            <Typography variant="h4">Category</Typography>

            <ButtonComponent label="Add Category" onClick={handleOpenModal} />
          </Box>

          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="All Categories" />
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
              {/* <Chip
                label={`All ${dummyCategory.length}`}
                sx={{ mr: 1 }}
                onClick={handleAllProductsClick}
              />
               {categories &&
              categories.map((item, index) => (
                <Chip
                  key={index}
                  label={`${item.name} ${item.count}`}
                  sx={{ mr: 1 }}
                  onClick={() => handleChipClick(item.name)}
                />
              ))} */}
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

          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#e6ede6",
              alignSelf: "center",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.N.</TableCell>

                  <TableCell>Name</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Created At</TableCell>
                  {/* <TableCell></TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryData &&
                  categoryData?.categories.map(
                    (category: any, index: number) => (
                      <Grow
                        in={true}
                        style={{ transformOrigin: "0 0 0" }}
                        timeout={1000 + index * 100}
                        key={category.id}
                      >
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography>{category.title}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{4}</TableCell>
                          <TableCell>
                            {new Date(category.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      </Grow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>

          <ModalComponent
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            showFooter={false}
            title="Add New Category"
          >
            <CustomForm
              fields={formFields}
              onSubmit={handleFormSubmit}
              btnName="Add Category"
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
    </>
  );
};

export default CategoryPage;
