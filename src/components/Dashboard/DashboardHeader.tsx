import { useEffect, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { FIRST_ITEM, DEBOUNCE_DELAY_TIME } from "constants_";
import { useSlice } from "slices";
import { useDebounce } from "hooks";
import { Data } from "types";

const DashboardHeader = () => {
  const [cityName, setCityName] = useSlice<string>("city");
  const [localCityName, setLocalCityName] = useState<string>(cityName);
  const [, setDataKey] = useSlice("dataKey");

  const [{ data: hereData, isLoading, error }] = useSlice<Data>("hereData");
  const debounce = useDebounce();

  const debounced = debounce((name) => setCityName(name), DEBOUNCE_DELAY_TIME);

  useEffect(() => {
    debounced(localCityName);
  }, [localCityName, debounced]);

  const dropDownOptions = ["humidity", "temp"];
  const onDropDownChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setDataKey(e.target.value);

  return (
    <>
      <CityRow>
        <StyledInput
          type="text"
          value={localCityName}
          onChange={(e) => setLocalCityName(e.target.value)}
          placeholder="City name"
        />
        {!isLoading && !error && !!hereData && (
          <div>{hereData?.items?.[FIRST_ITEM]?.title}</div>
        )}
      </CityRow>
      <StyledSelect onChange={onDropDownChange}>
        {dropDownOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </StyledSelect>
    </>
  );
};

const CityRow = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  height: 40px;
  width: 400px;
  border-radius: var(--main-border-radius);
  margin-right: 30px;
`;

const StyledSelect = styled.select`
  margin-top: var(--general-margin);
  height: 40px;
  width: 100px;
  border-radius: var(--main-border-radius);
`;

export default DashboardHeader;
