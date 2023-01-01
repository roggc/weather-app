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
  HISTORY1,
  HISTORY2,
  HISTORY3,
  HISTORY4,
  HISTORY5,
  FIREBASE,
} from "constants_";
import { initializeApp } from "firebase/app";
import { getRouter } from "other";
import { getHistoryPath } from "utils";

const App = () => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "googleAccessToken",
    null
  );

  const historyState1 = useFetch(
    API_URL,
    getHistoryPath(33.44, -94.04, 1),
    true,
    "http://"
  );
  const historyState2 = useFetch(
    API_URL,
    getHistoryPath(33.44, -94.04, 2),
    true,
    "http://"
  );
  const historyState3 = useFetch(
    API_URL,
    getHistoryPath(33.44, -94.04, 3),
    true,
    "http://"
  );
  const historyState4 = useFetch(
    API_URL,
    getHistoryPath(33.44, -94.04, 4),
    true,
    "http://"
  );
  const historyState5 = useFetch(
    API_URL,
    getHistoryPath(33.44, -94.04, 5),
    true,
    "http://"
  );

  const firebasePath = "/firebase-config";
  const googleAPIPath = `/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

  const firebaseState = useFetch(API_URL, firebasePath, true, "http://");
  const googleAPIState = useFetch(GOOGLE_API, googleAPIPath, !!accessToken);

  const { theme: themeValue } = useValues(theme);

  const { app: firebaseApp } = useValues(firebase);

  const { user: userData } = useValues(user);

  const { setter } = useValues(googleAccessToken);

  const {
    [data]: { set },
    [firebase]: { setOnce },
    [googleAccessToken]: { setSetterOnlyOnce },
    [user]: { set: setUser },
  } = useActions();

  const [router, setRouter] = useState(getRouter(!!userData));

  useEffect(() => {
    set(HISTORY1, historyState1);
  }, [historyState1, set]);

  useEffect(() => {
    set(HISTORY2, historyState2);
  }, [historyState2, set]);

  useEffect(() => {
    set(HISTORY3, historyState3);
  }, [historyState3, set]);

  useEffect(() => {
    set(HISTORY4, historyState4);
  }, [historyState4, set]);

  useEffect(() => {
    set(HISTORY5, historyState5);
  }, [historyState5, set]);

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
