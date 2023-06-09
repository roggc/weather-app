import getHookAndProviderFromSlices, {
  defineSlice,
} from "react-context-slices";

export const { useSlice, Provider } = getHookAndProviderFromSlices({
  city: defineSlice<string>({ initialArg: "" }),
  currentData: defineSlice<{}>({ initialArg: {} }),
  history1Data: defineSlice<{}>({ initialArg: {} }),
  history2Data: defineSlice<{}>({ initialArg: {} }),
  history3Data: defineSlice<{}>({ initialArg: {} }),
  history4Data: defineSlice<{}>({ initialArg: {} }),
  history5Data: defineSlice<{}>({ initialArg: {} }),
  firebaseData: defineSlice<{}>({ initialArg: {} }),
  hereData: defineSlice<{}>({ initialArg: {} }),
  dataKey: defineSlice<string>({ initialArg: "humidity" }),
  firebase: defineSlice<any>({ initialArg: null }),
  googleAccessToken: defineSlice<any>({ initialArg: null }),
  theme: defineSlice<boolean>({
    initialArg: true,
    isGetInitialStateFromStorage: true,
  }),
  user: defineSlice<any>({ initialArg: null }),
});
