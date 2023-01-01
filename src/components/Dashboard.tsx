import styled from "styled-components";
import { useValues, data } from "slices";
import { CURRENT, HISTORY } from "constants_";
import BasicLineChart from "components/charts/BasicLineChart";

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
        <Widget>
          <BasicLineChart
            data={historyData.hourly.map((hour: any, index: number) => ({
              humidity: hour.humidity,
              hour: index,
            }))}
          />
        </Widget>
      )}
    </>
  );
};

const Widget = styled.div`
  border-radius: var(--border-radius);
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.secondary};
  padding: var(--main-padding-container);
  margin: var(--general-margin);
  width: fit-content;
`;

export default Dashboard;
