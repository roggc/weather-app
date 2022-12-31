import { useValues, data } from "slices";
import { CURRENT, HISTORY } from "constants_";

const Dashboard = () => {
  const { [data]: dataFromAPICalls } = useValues(data);

  return (
    <div>
      <h3>Dashboard</h3>
    </div>
  );
};

export default Dashboard;
