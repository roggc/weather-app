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

export { name as theme } from "slices/theme";
export { name as data } from "slices/data";
export { name as firebase } from "slices/firebase";
export { name as user } from "slices/user";

export const useValues = (name) => ({
  ...useThemeValues(name),
  ...useDataValues(name),
  ...useFirebaseValues(name),
  ...useUserValues(name),
});

export const useActions = () => ({
  ...useThemeActions(),
  ...useDataActions(),
  ...useFirebaseActions(),
  ...useUserActions(),
});

export default composeProviders();
