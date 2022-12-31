import { useEffect } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "styled-components";
import { router } from "other";
import { useValues, useActions, theme, data } from "slices";
import { useFetch } from "hooks";
import { API_URL, NUM_OF_MS_IN_ONE_S, CURRENT, HISTORY } from "constants_";
import { decrementDateByNumOfDays } from "utils";

const App = () => {
  const daysBeforeToday = 5;
  const timeStamp = Math.round(
    decrementDateByNumOfDays(new Date(), daysBeforeToday).getTime() /
      NUM_OF_MS_IN_ONE_S
  );
  const currentPath = "/current?lat=33.44&lon=-94.04&exclude=hourly,daily";
  const historyPath = `/timemachine?lat=60.99&lon=30.9&dt=${timeStamp}`;
  const currentState = useFetch(API_URL, currentPath);
  const historyState = useFetch(API_URL, historyPath);
  const {
    [theme]: { theme: themeValue },
  } = useValues(theme);
  const {
    [data]: { set },
  } = useActions();
  useEffect(() => {
    set(CURRENT, currentState);
  }, [currentState, set]);
  useEffect(() => {
    set(HISTORY, historyState);
  }, [historyState, set]);
  return (
    <ThemeProvider theme={themeValue}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
