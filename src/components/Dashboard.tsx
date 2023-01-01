import { useValues, data } from "slices";
import { CURRENT, HISTORY } from "constants_";
import { LineChart, Line, XAxis, YAxis, Tooltip, Label } from "recharts";

const Dashboard = () => {
  const {
    [HISTORY]: {
      data: historyData,
      isLoading: historyIsLoading,
      error: historyError,
    },
  } = useValues(data);

  const isShowHistoryGraph = !historyIsLoading && !historyError;

  if (isShowHistoryGraph) {
    console.log("hystory data", historyData);
  }

  return (
    <>
      {isShowHistoryGraph && (
        <LineChart
          width={300}
          height={200}
          data={historyData.hourly.map((ho: any, index: number) => ({
            humidity: ho.humidity,
            hour: index,
          }))}
        >
          <Line dataKey="humidity" type="monotone" />
          <XAxis dataKey="hour">
            <Label value="hour" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label
              value="humidity"
              offset={0}
              position="insideLeft"
              angle={-90}
            />
          </YAxis>
          <Tooltip />
        </LineChart>
      )}
    </>
  );
};

export default Dashboard;
