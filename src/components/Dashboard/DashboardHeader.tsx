import styled from "styled-components";
import { FIRST_ITEM, HERE } from "constants_";
import { useValues, useActions, city, data } from "slices";

const DashboardHeader = () => {
  const { name: cityName } = useValues(city);
  const {
    [city]: { set: setCityName },
  } = useActions();
  const {
    [HERE]: { data: hereData, isLoading, error },
  } = useValues(data);
  return (
    <Header>
      <StyledInput
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      {!isLoading && !error && !!hereData && (
        <div>{hereData?.items?.[FIRST_ITEM]?.title}</div>
      )}
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  height: 40px;
  width: 400px;
  border-radius: var(--main-border-radius);
  margin-right: 30px;
`;

export default DashboardHeader;
