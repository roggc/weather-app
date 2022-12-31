import { composeProviders } from "react-context-slices";
import {
  useValues as useThemeValues,
  useActions as useThemeActions,
} from "slices/theme";
import {
  useValues as useDataValues,
  useActions as useDataActions,
} from "slices/data";

export { name as theme } from "slices/theme";
export { name as data } from "slices/data";

export const useValues = (name) => ({
  ...useThemeValues(name),
  ...useDataValues(name),
});

export const useActions = () => ({
  ...useThemeActions(),
  ...useDataActions(),
});

export default composeProviders();
