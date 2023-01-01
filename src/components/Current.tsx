import { useValues, data } from "slices";
import { CURRENT } from "constants_";
import DashboardHeader from "./Dashboard/DashboardHeader";

const CurrentDashboard = () => {
  const {
    [CURRENT]: { data: currentData, isLoading, error },
  } = useValues(data);

  if (!isLoading && !error) {
    console.log("currentData", currentData);
  }
  return (
    <>
      <DashboardHeader />
    </>
  );
};

export default CurrentDashboard;
