import { useValues, data } from "slices";
import { HISTORY1, HISTORY2, HISTORY3, HISTORY4, HISTORY5 } from "constants_";
import DashboardHeader from "components/Dashboard/DashboardHeader";
import Widgets from "components/Dashboard/Widgets";

const Dashboard = () => {
  const {
    [HISTORY1]: {
      data: history1Data,
      isLoading: history1IsLoading,
      error: history1Error,
    },
    [HISTORY2]: {
      data: history2Data,
      isLoading: history2IsLoading,
      error: history2Error,
    },
    [HISTORY3]: {
      data: history3Data,
      isLoading: history3IsLoading,
      error: history3Error,
    },
    [HISTORY4]: {
      data: history4Data,
      isLoading: history4IsLoading,
      error: history4Error,
    },
    [HISTORY5]: {
      data: history5Data,
      isLoading: history5IsLoading,
      error: history5Error,
    },
  } = useValues(data);

  const isShowHistory1Graph =
    !history1IsLoading && !history1Error && !!history1Data;
  const isShowHistory2Graph =
    !history2IsLoading && !history2Error && !!history2Data;
  const isShowHistory3Graph =
    !history3IsLoading && !history3Error && !!history3Data;
  const isShowHistory4Graph =
    !history4IsLoading && !history4Error && !!history4Data;
  const isShowHistory5Graph =
    !history5IsLoading && !history5Error && !!history5Data;

  const array = [
    { data: history1Data, condition: isShowHistory1Graph, id: 1 },
    { data: history2Data, condition: isShowHistory2Graph, id: 2 },
    { data: history3Data, condition: isShowHistory3Graph, id: 3 },
    { data: history4Data, condition: isShowHistory4Graph, id: 4 },
    { data: history5Data, condition: isShowHistory5Graph, id: 5 },
  ];

  return (
    <>
      <DashboardHeader />
      <Widgets array={array} />
    </>
  );
};

export default Dashboard;
