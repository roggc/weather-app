import { useSlice } from "slices";
import DashboardHeader from "components/Dashboard/DashboardHeader";
import Widgets from "components/Dashboard/Widgets";
import { Data } from "types";

const CurrentDashboard = () => {
  const [{ data: currentData, isLoading, error }] =
    useSlice<Data>("currentData");

  const isShowCurrentGraph = !isLoading && !error && !!currentData;

  const array = [{ data: currentData, condition: isShowCurrentGraph, id: 1 }];

  return (
    <>
      <DashboardHeader />
      <Widgets array={array} dataKey="humidity" />
    </>
  );
};

export default CurrentDashboard;
