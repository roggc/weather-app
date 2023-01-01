import { useState } from "react";
import styled from "styled-components";
import { useValues, useActions, data, city } from "slices";
import {
  HISTORY1,
  HISTORY2,
  HISTORY3,
  HISTORY4,
  HISTORY5,
  HERE,
} from "constants_";
import BasicLineChart from "components/charts/BasicLineChart";

const Dashboard = () => {
  const { name: cityName } = useValues(city);
  const {
    [city]: { set: setCityName },
  } = useActions();
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
    [HERE]: { data: hereData, isLoading: hereIsLoading, error: hereError },
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
      <Header>
        <StyledInput
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        {!hereIsLoading && !hereError && !!hereData && (
          <div>{hereData?.items?.[0]?.title}</div>
        )}
      </Header>
      <WidgetsContainer>
        {array.map(
          (object) =>
            object.condition && (
              <Widget key={object.id}>
                <BasicLineChart
                  data={object.data.hourly?.map((hour: any, index: number) => ({
                    humidity: hour.humidity,
                    hour: index,
                  }))}
                />
              </Widget>
            )
        )}
      </WidgetsContainer>
    </>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Widget = styled.div`
  border-radius: var(--main-border-radius);
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.secondary};
  padding: var(--main-padding-container);
  margin: var(--general-margin);
  width: fit-content;
`;

const WidgetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledInput = styled.input`
  height: 40px;
  width: 400px;
  border-radius: var(--main-border-radius);
  margin-right: 30px;
`;

export default Dashboard;
