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
  city,
} from "slices";
import { useFetch, useLocalStorage } from "hooks";
import {
  MY_API_URL,
  GOOGLE_API,
  HISTORY1,
  HISTORY2,
  HISTORY3,
  HISTORY4,
  HISTORY5,
  FIREBASE,
  HERE,
  FIRST_ITEM,
  CURRENT,
} from "constants_";
import { initializeApp } from "firebase/app";
import { getRouter } from "other";
import { getHistoryPath, getCurrentPath } from "utils";
import { lightTheme, darkTheme } from "other";

const App = () => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "googleAccessToken",
    null
  );

  const { name: cityName } = useValues(city);

  const [historyPath1, setHistoryPath1] = useState("");
  const [historyPath2, setHistoryPath2] = useState("");
  const [historyPath3, setHistoryPath3] = useState("");
  const [historyPath4, setHistoryPath4] = useState("");
  const [historyPath5, setHistoryPath5] = useState("");
  const [currentPath, setCurrentPath] = useState("");

  const [isHereReady, setIsHereReady] = useState(false);

  const firebasePath = "/firebase-config";
  const googleAPIPath = `/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;
  const herePath = `/here-coordinates?q=${cityName}`;

  const firebaseState = useFetch(MY_API_URL, firebasePath, true, "http://");
  const googleAPIState = useFetch(GOOGLE_API, googleAPIPath, !!accessToken);
  const hereState = useFetch(MY_API_URL, herePath, true, "http://");

  useEffect(() => {
    const isHereReady_ =
      !hereState.isLoading && !hereState.error && !!hereState.data;
    setIsHereReady(
      isHereReady_ &&
        !!cityName && // @ts-ignore
        !!hereState.data?.items?.[FIRST_ITEM]?.position
    );

    if (
      isHereReady_ &&
      !!cityName && // @ts-ignore
      !!hereState.data?.items?.[FIRST_ITEM]?.position
    ) {
      // @ts-ignore
      const { lat, lng } = hereState.data?.items?.[FIRST_ITEM].position;
      setHistoryPath1(getHistoryPath(lat, lng, 1));
      setHistoryPath2(getHistoryPath(lat, lng, 2));
      setHistoryPath3(getHistoryPath(lat, lng, 3));
      setHistoryPath4(getHistoryPath(lat, lng, 4));
      setHistoryPath5(getHistoryPath(lat, lng, 5));
      setCurrentPath(getCurrentPath(lat, lng));
    }
  }, [hereState.isLoading, hereState.error, hereState.data, cityName]);

  const historyState1 = useFetch(
    MY_API_URL,
    historyPath1,
    isHereReady,
    "http://"
  );

  const historyState2 = useFetch(
    MY_API_URL,
    historyPath2,
    isHereReady,
    "http://"
  );

  const historyState3 = useFetch(
    MY_API_URL,
    historyPath3,
    isHereReady,
    "http://"
  );

  const historyState4 = useFetch(
    MY_API_URL,
    historyPath4,
    isHereReady,
    "http://"
  );

  const historyState5 = useFetch(
    MY_API_URL,
    historyPath5,
    isHereReady,
    "http://"
  );

  const currentState = useFetch(
    MY_API_URL,
    currentPath,
    isHereReady,
    "http://"
  );

  const { isLight } = useValues(theme);

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
    set(CURRENT, currentState);
  }, [currentState, set]);

  useEffect(() => {
    set(FIREBASE, firebaseState);
  }, [firebaseState, set]);

  useEffect(() => {
    set(HERE, hereState);
  }, [hereState, set]);

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
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
