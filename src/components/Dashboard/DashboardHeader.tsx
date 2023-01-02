import { useEffect, useState } from "react";
import styled from "styled-components";
import { FIRST_ITEM, HERE, DEBOUNCE_DELAY_TIME } from "constants_";
import { useValues, useActions, city, data } from "slices";
import { useDebounce } from "hooks";

const DashboardHeader = () => {
  const { name: cityName } = useValues(city);
  const [localCityName, setLocalCityName] = useState(cityName);
  const {
    [city]: { set: setCityName },
  } = useActions();
  const {
    [HERE]: { data: hereData, isLoading, error },
  } = useValues(data);
  const debounce = useDebounce();

  const debounced = debounce((name) => setCityName(name), DEBOUNCE_DELAY_TIME);

  useEffect(() => {
    debounced(localCityName);
  }, [localCityName, debounced]);

  return (
    <Header>
      <StyledInput
        type="text"
        value={localCityName}
        onChange={(e) => setLocalCityName(e.target.value)}
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
