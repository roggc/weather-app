import styled from "styled-components";
import BasicLineChart from "components/charts/BasicLineChart";

const Widgets = ({ array }: { array: any[] }) => {
  return (
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
  );
};

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

export default Widgets;
