import { useEffect } from "react";
import { API_URL } from "../constants";

const Dashboard = () => {
  useEffect(() => {
    fetch(`http://${API_URL}/data?lat=33.44&lon=-94.04&exclude=hourly,daily`)
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div>
      <h3>Dashboard</h3>
    </div>
  );
};

export default Dashboard;
