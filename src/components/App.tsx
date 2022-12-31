import { useEffect } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "styled-components";
import { router } from "other";
import { useValues, useActions, theme, data, firebase } from "slices";
import { useFetch } from "hooks";
import {
  API_URL,
  NUM_OF_MS_IN_ONE_S,
  CURRENT,
  HISTORY,
  FIREBASE,
} from "constants_";
import { decrementDateByNumOfDays } from "utils";
import { initializeApp } from "firebase/app";

const App = () => {
  const daysBeforeToday = 5;
  const timeStamp = Math.round(
    decrementDateByNumOfDays(new Date(), daysBeforeToday).getTime() /
      NUM_OF_MS_IN_ONE_S
  );
  const currentPath = "/current?lat=33.44&lon=-94.04&exclude=hourly,daily";
  const historyPath = `/timemachine?lat=60.99&lon=30.9&dt=${timeStamp}`;
  const firebasePath = "/firebase-config";
  const currentState = useFetch(API_URL, currentPath);
  const historyState = useFetch(API_URL, historyPath);
  const firebaseState = useFetch(API_URL, firebasePath);
  const {
    [theme]: { theme: themeValue },
  } = useValues(theme);
  const { [firebase]: firebaseApp } = useValues(firebase);
  const {
    [data]: { set },
    [firebase]: { setOnce },
  } = useActions();
  useEffect(() => {
    set(CURRENT, currentState);
  }, [currentState, set]);
  useEffect(() => {
    set(HISTORY, historyState);
  }, [historyState, set]);
  useEffect(() => {
    set(FIREBASE, firebaseState);
  }, [firebaseState, set]);
  useEffect(() => {
    if (
      !firebaseState.isLoading &&
      !firebaseState.error &&
      firebaseState.data &&
      !firebaseApp
    ) {
      const app = initializeApp(firebaseState.data);
      setOnce(app);
    }
  }, [
    firebaseState.isLoading,
    firebaseState.error,
    firebaseState.data,
    setOnce,
    firebaseApp,
  ]);
  return (
    <ThemeProvider theme={themeValue}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
