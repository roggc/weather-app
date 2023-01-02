import { LineChart, Line, YAxis, XAxis, Label, Tooltip } from "recharts";

type Props<T> = {
  data: T[];
  dataKey: string;
  width?: number;
  height?: number;
};

const BasicLineChart = <T,>({
  data,
  dataKey,
  width = 300,
  height = 200,
}: Props<T>) => {
  console.log("key", dataKey);
  return (
    <LineChart width={width} height={height} data={data}>
      <Line dataKey={dataKey} type="monotone" />
      <XAxis dataKey="hour">
        <Label value="hour" offset={0} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value={dataKey} offset={0} position="insideLeft" angle={-90} />
      </YAxis>
      <Tooltip />
    </LineChart>
  );
};

export default BasicLineChart;
