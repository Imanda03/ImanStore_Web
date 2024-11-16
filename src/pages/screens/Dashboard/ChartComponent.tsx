import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "react-query";
import { fetchPredictData } from "../../../services/predictionService";

interface SalesData {
  date: string;
  Beauty: number;
  Beverages: number;
  Cleaning: number;
  Dairy: number;
  Meats: number;
  "Pet Supplies": number;
  "Prepared Foods": number;
  Seafood: number;
  Automotive: number;
  "Baby Care": number;
}

interface GradientColors {
  [key: string]: [string, string];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    stroke: string;
  }>;
  label?: string;
}

const ChartComponent: React.FC = () => {
  const [animate, setAnimate] = useState<boolean>(false);

  const { data: predictionData, isLoading } = useQuery(
    "PredictData",
    fetchPredictData
  );

  useEffect(() => {
    setAnimate(true);
  }, []);

  const gradients: GradientColors = {
    Beauty: ["#ff69b4", "#ff1493"],
    Beverages: ["#87ceeb", "#4169e1"],
    Cleaning: ["#98fb98", "#32cd32"],
    Dairy: ["#fafad2", "#ffd700"],
    Meats: ["#ff7f50", "#ff4500"],
    "Pet Supplies": ["#deb887", "#8b4513"],
    "Prepared Foods": ["#ffa07a", "#ff8c00"],
    Seafood: ["#afeeee", "#00ced1"],
    Automotive: ["#708090", "#2f4f4f"],
    "Baby Care": ["#ffb6c1", "#ffc0cb"],
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  const formatValue = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <Card sx={{ bgcolor: "background.paper", boxShadow: 2, p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {label && formatDate(label)}
          </Typography>
          {payload.map((entry, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.5 }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: gradients[entry.name][1],
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                {entry.name}:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatValue(entry.value)}
              </Typography>
            </Box>
          ))}
        </Card>
      );
    }
    return null;
  };

  const chartData =
    predictionData &&
    predictionData?.map((item: any) => ({
      date: item.date,
      ...item.values, // Spread out values into the top level
    }));

  const formattedData = chartData?.map((item: any) => ({
    date: item.date,
    Beauty: item.BEAUTY,
    Beverages: item.BEVERAGES,
    Cleaning: item.CLEANING,
    Dairy: item.DAIRY,
    Meats: item.MEATS,
    "Pet Supplies": item["PET SUPPLIES"],
    "Prepared Foods": item["PREPARED FOODS"],
    Seafood: item.SEAFOOD,
    Automotive: item.AUTOMOTIVE,
    "Baby Care": item["BABY CARE"],
  }));

  const activeCategories = Object.keys(gradients).filter(
    (category) =>
      formattedData &&
      formattedData.some((day: any) => day[category as keyof SalesData] > 0)
  );

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "lg",
        height: "100%",
        background: "linear-gradient(to bottom right, #ffffff, #f5f5f5)",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Sales Prediction by Category
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Sales performance across categories
        </Typography>
        <Box sx={{ height: 600, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={animate ? formattedData : []}
              margin={{ top: 50, right: 30, left: 20, bottom: -50 }}
            >
              <defs>
                {Object.entries(gradients).map(([key, [color1, color2]]) => (
                  <linearGradient
                    key={key}
                    id={`gradient-${key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={color1} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={color2} stopOpacity={0.3} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fill: "#666" }}
              />
              <YAxis
                tickFormatter={formatValue}
                width={100}
                tick={{ fill: "#666" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                onClick={(event) => {
                  if (event && event.dataKey) {
                    console.log(`Category clicked: ${event.dataKey}`);
                  }
                }}
                wrapperStyle={{
                  paddingTop: "40px",
                  marginBottom: "20px",
                }}
              />
              {activeCategories.map((category) => (
                <Line
                  key={category}
                  type="monotone"
                  dataKey={category}
                  name={category}
                  stroke={gradients[category][1]}
                  strokeWidth={3}
                  dot={{
                    r: 6,
                    strokeWidth: 2,
                    stroke: gradients[category][1],
                    fill: "#fff",
                  }}
                  activeDot={{
                    r: 8,
                    stroke: gradients[category][1],
                    strokeWidth: 2,
                    fill: gradients[category][0],
                  }}
                  fill={`url(#gradient-${category})`}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
