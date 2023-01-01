import { LineChart, Line, YAxis, XAxis, Label, Tooltip } from "recharts";

type Props<T> = {
  data: T[];
  width?: number;
  height?: number;
};

const BasicLineChart = <T,>({ data, width = 300, height = 200 }: Props<T>) => {
  return (
    <LineChart width={width} height={height} data={data}>
      <Line dataKey="humidity" type="monotone" />
      <XAxis dataKey="hour">
        <Label value="hour" offset={0} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value="humidity" offset={0} position="insideLeft" angle={-90} />
      </YAxis>
      <Tooltip />
    </LineChart>
  );
};

export default BasicLineChart;
