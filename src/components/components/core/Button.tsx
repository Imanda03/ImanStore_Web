import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface ButtonProps {
  label: string;
  onClick: () => void;
  others?: any;
}

const ButtonComponent = ({ label, onClick, ...others }: ButtonProps) => {
  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: "#4f5d52",
          "&:hover": { backgroundColor: "#36463d" },
        }}
        onClick={onClick}
        {...others}
      >
        {label}
      </Button>
    </>
  );
};

export default ButtonComponent;
