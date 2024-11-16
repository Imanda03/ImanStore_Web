import React from "react";
import ButtonComponent from "../../../components/components/core/Button";
import useLagRadar from "../../../components/components/useLagRadar";
import ChartComponent from "./ChartComponent";

const Dashboard = () => {
  const { radar } = useLagRadar();
  return (
    <>
      {radar}
      <ChartComponent />
    </>
  );
};

export default Dashboard;
