import getHookAndProviderFromSlices, {
  defineSlice,
} from "react-context-slices";

export const { useSlice, Provider } = getHookAndProviderFromSlices({
  city: defineSlice<string>({ initialState: "" }),
  currentData: defineSlice<{}>({ initialState: {} }),
  history1Data: defineSlice<{}>({ initialState: {} }),
  history2Data: defineSlice<{}>({ initialState: {} }),
  history3Data: defineSlice<{}>({ initialState: {} }),
  history4Data: defineSlice<{}>({ initialState: {} }),
  history5Data: defineSlice<{}>({ initialState: {} }),
  firebaseData: defineSlice<{}>({ initialState: {} }),
  hereData: defineSlice<{}>({ initialState: {} }),
  dataKey: defineSlice<string>({ initialState: "humidity" }),
  firebase: defineSlice<any>({ initialState: null }),
  googleAccessToken: defineSlice<any>({ initialState: null }),
  theme: defineSlice<boolean>({
    initialState: true,
    isGetInitialStateFromStorage: true,
  }),
  user: defineSlice<any>({ initialState: null }),
});
