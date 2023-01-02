import styled from "styled-components";
import BasicLineChart from "components/charts/BasicLineChart";

const Widgets = ({ array, dataKey }: { array: any[]; dataKey: string }) => {
  return (
    <WidgetsContainer>
      {array.map(
        (object) =>
          object.condition && (
            <Widget key={object.id}>
              <BasicLineChart
                data={object.data.hourly?.map((hour: any, index: number) => ({
                  [dataKey]: hour[dataKey],
                  hour: index,
                }))}
                dataKey={dataKey}
              />
            </Widget>
          )
      )}
    </WidgetsContainer>
  );
};

const Widget = styled.div`
  border-radius: var(--main-border-radius);
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.secondary};
  padding: var(--main-padding-container);
  margin-right: var(--general-margin);
  margin-top: var(--general-margin);
  width: fit-content;
`;

const WidgetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default Widgets;
