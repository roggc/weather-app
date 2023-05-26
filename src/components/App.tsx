import { useEffect, useState } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "styled-components";
import { useSlice } from "slices";
import { useFetch, useLocalStorage } from "hooks";
import { MY_API_URL_DEV, GOOGLE_API, FIRST_ITEM } from "constants_";
import { initializeApp } from "firebase/app";
import { getRouter } from "other";
import { getHistoryPath } from "utils";
import { lightTheme, darkTheme } from "other";

const App = () => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "googleAccessToken",
    null
  );

  const [cityName] = useSlice("city");

  const [historyPath1, setHistoryPath1] = useState("");
  const [historyPath2, setHistoryPath2] = useState("");
  const [historyPath3, setHistoryPath3] = useState("");
  const [historyPath4, setHistoryPath4] = useState("");
  const [historyPath5, setHistoryPath5] = useState("");

  const [isHereReady, setIsHereReady] = useState(false);

  const firebasePath = "/firebase-config";
  const googleAPIPath = `/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;
  const herePath = `/here-coordinates?q=${cityName}`;

  const firebaseState = useFetch(MY_API_URL_DEV, firebasePath, true, "http://");
  const googleAPIState = useFetch(GOOGLE_API, googleAPIPath, !!accessToken);
  const hereState = useFetch(MY_API_URL_DEV, herePath, true, "http://");

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
    }
  }, [hereState.isLoading, hereState.error, hereState.data, cityName]);

  const historyState1 = useFetch(
    MY_API_URL_DEV,
    historyPath1,
    isHereReady,
    "http://"
  );

  const historyState2 = useFetch(
    MY_API_URL_DEV,
    historyPath2,
    isHereReady,
    "http://"
  );

  const historyState3 = useFetch(
    MY_API_URL_DEV,
    historyPath3,
    isHereReady,
    "http://"
  );

  const historyState4 = useFetch(
    MY_API_URL_DEV,
    historyPath4,
    isHereReady,
    "http://"
  );

  const historyState5 = useFetch(
    MY_API_URL_DEV,
    historyPath5,
    isHereReady,
    "http://"
  );

  const [isLight] = useSlice("theme");
  const [firebaseApp, setFirebaseApp] = useSlice("firebase");
  const [userData, setUser] = useSlice("user");
  const [setter, setSetter] = useSlice("googleAccessToken");
  const [, setHistory1Data] = useSlice("history1Data");
  const [, setHistory2Data] = useSlice("history2Data");
  const [, setHistory3Data] = useSlice("history3Data");
  const [, setHistory4Data] = useSlice("history4Data");
  const [, setHistory5Data] = useSlice("history5Data");
  const [, setFirebaseData] = useSlice("firebaseData");
  const [, setHereData] = useSlice("hereData");

  const [router, setRouter] = useState(getRouter(!!userData));

  useEffect(() => {
    setHistory1Data(historyState1);
  }, [historyState1, setHistory1Data]);

  useEffect(() => {
    setHistory2Data(historyState2);
  }, [historyState2, setHistory2Data]);

  useEffect(() => {
    setHistory3Data(historyState3);
  }, [historyState3, setHistory3Data]);

  useEffect(() => {
    setHistory4Data(historyState4);
  }, [historyState4, setHistory4Data]);

  useEffect(() => {
    setHistory5Data(historyState5);
  }, [historyState5, setHistory5Data]);

  useEffect(() => {
    setFirebaseData(firebaseState);
  }, [firebaseState, setFirebaseData]);

  useEffect(() => {
    setHereData(hereState);
  }, [hereState, setHereData]);

  useEffect(() => {
    if (
      !firebaseState.isLoading &&
      !firebaseState.error &&
      firebaseState.data &&
      !firebaseApp
    ) {
      const app = initializeApp(firebaseState.data);
      !firebaseApp && setFirebaseApp(app);
    }
  }, [
    firebaseState.isLoading,
    firebaseState.error,
    firebaseState.data,
    setFirebaseApp,
    firebaseApp,
  ]);

  useEffect(() => {
    if (setAccessToken && !setter) {
      !setter && setSetter((s: () => void) => (!s ? setAccessToken : s));
    }
  }, [setAccessToken, setSetter, setter]);

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
