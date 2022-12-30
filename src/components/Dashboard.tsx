import { useEffect } from "react";
import { API_URL } from "../constants";
import { decrementDateByNumOfDays } from "../utils";

const NUM_OF_MS_IN_ONE_S = 1000;

const Dashboard = () => {
  useEffect(() => {
    fetch(`http://${API_URL}/current?lat=33.44&lon=-94.04&exclude=hourly,daily`)
      .then((resp) => resp.json())
      .then((data) => console.log(data));

    const daysBeforeToday = 1;

    fetch(
      `http://${API_URL}/timemachine?lat=60.99&lon=30.9&dt=${Math.round(
        decrementDateByNumOfDays(new Date(), daysBeforeToday).getTime() /
          NUM_OF_MS_IN_ONE_S
      )}&only_current={true}`
    )
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
