import getHookAndProviderFromSlices from "react-context-slices";

export const { useSlice, Provider } = getHookAndProviderFromSlices(
  {
    city: "",
    currentData: {},
    history1Data: {},
    history2Data: {},
    history3Data: {},
    history4Data: {},
    history5Data: {},
    firebaseData: {},
    hereData: {},
    dataKey: "humidity",
    firebase: null,
    googleAccessToken: null,
    theme: true,
    user: null,
  },
  {
    theme: true,
  }
);
