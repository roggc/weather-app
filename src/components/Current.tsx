import { useValues, data } from "slices";
import { CURRENT } from "constants_";
import DashboardHeader from "components/Dashboard/DashboardHeader";
import Widgets from "components/Dashboard/Widgets";

const CurrentDashboard = () => {
  const {
    //@ts-ignore
    [CURRENT]: { data: currentData, isLoading, error },
  } = useValues(data);

  const isShowCurrentGraph = !isLoading && !error && !!currentData;

  const array = [{ data: currentData, condition: isShowCurrentGraph, id: 1 }];

  if (isShowCurrentGraph) {
    console.log("currentData", currentData);
  }

  return (
    <>
      <DashboardHeader />
      <Widgets array={array} dataKey="humidity" />
    </>
  );
};

export default CurrentDashboard;
