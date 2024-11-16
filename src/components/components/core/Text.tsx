import React from "react";
import { Typography } from "@mui/material";

interface TitleProps {
  content: string | number;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2";
  align?: "inherit" | "left" | "center" | "right" | "justify";
  fontSize?: string | number;
  color?: string;
  weight?: string;
}

const Title: React.FC<TitleProps> = ({
  content,
  variant = "h5",
  align = "left",
  fontSize,
  color,
  weight,
}) => {
  return (
    <Typography
      variant={variant}
      align={align}
      style={{ fontSize, color, fontWeight: weight }}
    >
      {content}
    </Typography>
  );
};

export default Title;
