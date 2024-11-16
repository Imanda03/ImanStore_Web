import React, { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  FieldError,
} from "react-hook-form";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Avatar,
  IconButton,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

interface FormValues {
  [key: string]: any;
}

interface ReusableFormProps {
  fields: {
    name: string;
    label: string;
    type?: string;
    data?: { label: string; value: any }[];
    validation?: { [key: string]: any };
    acceptMultipleFiles?: boolean;
  }[];
  btnName: string;
  onSubmit: (data: FormValues) => void;
  btnAlign?: "left" | "center" | "right";
  initialValues?: FormValues;
}

const CustomForm: React.FC<ReusableFormProps> = ({
  fields,
  onSubmit,
  btnName,
  btnAlign = "left",
  initialValues = {},
}) => {
  console.log("first", initialValues);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>();

  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    Object.keys(initialValues).forEach((key) => {
      setValue(key, initialValues[key]);
    });

    // If there are image URLs in initialValues, set them as selectedImages (for preview)
    if (initialValues.images && Array.isArray(initialValues.images)) {
      const initialImagePreviews = initialValues.images.map((url: string) => ({
        file: null, // No file object, just the URL
        preview: url,
      }));

      // Combine initial images and selected images, ensuring uniqueness based on preview URL
      setSelectedImages((prev: any) => {
        const uniqueImages = [
          ...prev,
          ...initialImagePreviews.filter(
            (newImage) =>
              !prev.some(
                (existingImage: any) =>
                  existingImage.preview === newImage.preview
              )
          ),
        ];
        return uniqueImages;
      });
    }
  }, [initialValues, setValue]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    acceptMultipleFiles: boolean
  ) => {
    const files = event.target.files;
    if (files) {
      const images = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      if (acceptMultipleFiles) {
        setSelectedImages((prev: any) => [...prev, ...images]);
      } else {
        setSelectedImages([images[0]]);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prev: any) =>
      prev.filter((_: any, i: number) => i !== index)
    );
  };

  const uploadImagesToCloudinary = async (
    images: File[]
  ): Promise<string[]> => {
    return await Promise.all(
      images.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dac2bl82p/image/upload",
          data
        );

        console.log("first", uploadRes.data.url);
        return uploadRes.data.url;
      })
    );
  };

  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    setIsUploading(true);
    try {
      if (selectedImages.length > 0) {
        const imageFiles = selectedImages
          .filter((img: any) => img.file)
          .map((img: any) => img.file);
        const uploadedUrls = await uploadImagesToCloudinary(imageFiles);
        data.images = uploadedUrls;
      }
      onSubmit(data);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const buttonStyles = {
    display: "flex",
    justifyContent:
      btnAlign === "center"
        ? "center"
        : btnAlign === "right"
        ? "flex-end"
        : "flex-start",
    marginTop: "16px",
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)} sx={{ mt: 2 }}>
      {fields.map((field, index) => (
        <div key={index}>
          {field.type === "dropdown" && field.data ? (
            <FormControl fullWidth margin="normal">
              <InputLabel>{field.label}</InputLabel>
              <Select
                label={field.label}
                {...register(field.name, field.validation)}
                defaultValue={initialValues[field.name] || ""}
                error={!!errors[field.name]}
              >
                {field.data.map((option, idx) => (
                  <MenuItem key={idx} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors[field.name] && (
                <p style={{ color: "red" }}>
                  {(errors[field.name] as FieldError).message}
                </p>
              )}
            </FormControl>
          ) : field.type === "file" ? (
            <Box mt={2}>
              <InputLabel>{field.label}</InputLabel>
              <Stack direction="row" alignItems="center" spacing={2} mt={1}>
                <label htmlFor={`icon-button-file-${field.name}`}>
                  <input
                    accept="image/*"
                    id={`icon-button-file-${field.name}`}
                    type="file"
                    {...register(field.name, field.validation)}
                    style={{ display: "none" }}
                    multiple={field.acceptMultipleFiles}
                    onChange={(e) =>
                      handleImageChange(e, field.acceptMultipleFiles || false)
                    }
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={{ backgroundColor: "#f1f1f1", p: 2, borderRadius: 2 }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <Typography>
                  {selectedImages.length} image(s) selected
                </Typography>
              </Stack>
              {errors[field.name] && (
                <Typography color="error" variant="body2" mt={1}>
                  {String(errors[field.name]?.message) ||
                    "Invalid file selection"}
                </Typography>
              )}

              <Box mt={2} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {selectedImages.map((image: any, idx: number) => (
                  <Box
                    key={idx}
                    sx={{ position: "relative", display: "inline-block" }}
                  >
                    <Avatar
                      src={image.preview}
                      alt={`Preview ${idx + 1}`}
                      sx={{ width: 75, height: 75, boxShadow: 2 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteImage(idx)}
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        backgroundColor: "white",
                        "&:hover": { backgroundColor: "red", color: "white" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : field.type === "textbox" ? (
            <TextField
              label={field.label}
              {...register(field.name, field.validation)}
              fullWidth
              margin="normal"
              error={!!errors[field.name]}
              defaultValue={initialValues[field.name] || ""}
              helperText={
                errors[field.name]
                  ? (errors[field.name] as FieldError).message
                  : undefined
              }
              multiline
              rows={4} // You can adjust the number of rows to fit the desired height for the paragraph input
            />
          ) : (
            <TextField
              label={field.label}
              type={field.type || "text"}
              {...register(field.name, field.validation)}
              fullWidth
              margin="normal"
              error={!!errors[field.name]}
              defaultValue={initialValues[field.name] || ""}
              helperText={
                errors[field.name]
                  ? (errors[field.name] as FieldError).message
                  : undefined
              }
            />
          )}
        </div>
      ))}
      <Box sx={buttonStyles}>
        <Button
          type="submit"
          variant="contained"
          disabled={isUploading}
          sx={{
            backgroundColor: "#4f5d52",
            "&:hover": { backgroundColor: "#36463d" },
          }}
        >
          {isUploading ? <CircularProgress size={24} /> : btnName}
        </Button>
      </Box>
    </Box>
  );
};

export default CustomForm;
