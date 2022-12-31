import { useEffect, useState } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "styled-components";
import {
  useValues,
  useActions,
  theme,
  data,
  firebase,
  googleAccessToken,
  user,
} from "slices";
import { useFetch, useLocalStorage } from "hooks";
import {
  API_URL,
  GOOGLE_API,
  NUM_OF_MS_IN_ONE_S,
  CURRENT,
  HISTORY,
  FIREBASE,
} from "constants_";
import { decrementDateByNumOfDays } from "utils";
import { initializeApp } from "firebase/app";
import { getRouter } from "other";

const App = () => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "googleAccessToken",
    null
  );

  const daysBeforeToday = 5;
  const timeStamp = Math.round(
    decrementDateByNumOfDays(new Date(), daysBeforeToday).getTime() /
      NUM_OF_MS_IN_ONE_S
  );

  const currentPath = "/current?lat=33.44&lon=-94.04&exclude=hourly,daily";
  const historyPath = `/timemachine?lat=60.99&lon=30.9&dt=${timeStamp}`;
  const firebasePath = "/firebase-config";
  const googleAPIPath = `/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

  const currentState = useFetch(API_URL, currentPath, true, "http://");
  const historyState = useFetch(API_URL, historyPath, true, "http://");
  const firebaseState = useFetch(API_URL, firebasePath, true, "http://");
  const googleAPIState = useFetch(GOOGLE_API, googleAPIPath, !!accessToken);

  const {
    [theme]: { theme: themeValue },
  } = useValues(theme);

  const { [firebase]: firebaseApp } = useValues(firebase);

  const { [user]: userData } = useValues(user);

  const {
    [googleAccessToken]: { setter },
  } = useValues(googleAccessToken);

  const {
    [data]: { set },
    [firebase]: { setOnce },
    [googleAccessToken]: { setSetterOnlyOnce },
    [user]: { set: setUser },
  } = useActions();

  const [router, setRouter] = useState(getRouter(!!userData));

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

  useEffect(() => {
    if (setAccessToken && !setter) {
      setSetterOnlyOnce(setAccessToken);
    }
  }, [setAccessToken, setSetterOnlyOnce, setter]);

  useEffect(() => {
    if (
      googleAPIState.data &&
      !googleAPIState.isLoading &&
      !googleAPIState.error &&
      !userData &&
      accessToken
    ) {
      setUser(googleAPIState.data);
    }
  }, [
    googleAPIState.data,
    googleAPIState.isLoading,
    googleAPIState.error,
    userData,
    setUser,
    accessToken,
  ]);

  useEffect(() => {
    setRouter(getRouter(!!userData));
  }, [userData]);

  return (
    <ThemeProvider theme={themeValue}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
