import { useValues, data } from "slices";
import { CURRENT, HISTORY } from "constants_";

const Dashboard = () => {
  const { [HISTORY]: historyData } = useValues(data);
  console.log("hystory data", historyData);
  return (
    <div>
      <h3>Dashboard</h3>
    </div>
  );
};

export default Dashboard;
