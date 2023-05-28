import { useSlice } from "slices";
import DashboardHeader from "components/Dashboard/DashboardHeader";
import Widgets from "components/Dashboard/Widgets";
import { Data } from "types";

const Dashboard = () => {
  const [
    { data: history1Data, isLoading: history1IsLoading, error: history1Error },
  ] = useSlice<Data>("history1Data");
  const [
    { data: history2Data, isLoading: history2IsLoading, error: history2Error },
  ] = useSlice<Data>("history2Data");
  const [
    { data: history3Data, isLoading: history3IsLoading, error: history3Error },
  ] = useSlice<Data>("history3Data");
  const [
    { data: history4Data, isLoading: history4IsLoading, error: history4Error },
  ] = useSlice<Data>("history4Data");
  const [
    { data: history5Data, isLoading: history5IsLoading, error: history5Error },
  ] = useSlice<Data>("history5Data");

  const [dataKey] = useSlice<string>("dataKey");

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
      <Widgets array={array} dataKey={dataKey!} />
    </>
  );
};

export default Dashboard;
