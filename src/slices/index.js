import { composeProviders } from "react-context-slices";
import {
  useValues as useThemeValues,
  useActions as useThemeActions,
} from "./theme";

export { name as theme } from "./theme";

export const useValues = (name) => ({
  ...useThemeValues(name),
});

export const useActions = () => ({
  ...useThemeActions(),
});

export default composeProviders();
