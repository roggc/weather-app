import { composeProviders } from "react-context-slices";
import {
  useValues as useThemeValues,
  useActions as useThemeActions,
} from "slices/theme";
import {
  useValues as useDataValues,
  useActions as useDataActions,
} from "slices/data";
import {
  useValues as useFirebaseValues,
  useActions as useFirebaseActions,
} from "slices/firebase";
import {
  useValues as useUserValues,
  useActions as useUserActions,
} from "slices/user";
import {
  useValues as useGoogleAccessTokenValues,
  useActions as useGoogleAccessTokenActions,
} from "slices/googleAccessToken";
import {
  useValues as useCityValues,
  useActions as useCityActions,
} from "slices/city";

export { name as theme } from "slices/theme";
export { name as data } from "slices/data";
export { name as firebase } from "slices/firebase";
export { name as user } from "slices/user";
export { name as googleAccessToken } from "slices/googleAccessToken";
export { name as city } from "slices/city";

export const useValues = (name) => ({
  ...useThemeValues(name),
  ...useDataValues(name),
  ...useFirebaseValues(name),
  ...useUserValues(name),
  ...useGoogleAccessTokenValues(name),
  ...useCityValues(name),
});

export const useActions = () => ({
  ...useThemeActions(),
  ...useDataActions(),
  ...useFirebaseActions(),
  ...useUserActions(),
  ...useGoogleAccessTokenActions(),
  ...useCityActions(),
});

export default composeProviders();
