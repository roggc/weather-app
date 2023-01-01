import { createSlice } from "react-context-slices";
import { lightTheme, darkTheme } from "other";

export const name = "theme";
const initialState = { theme: lightTheme, isLight: true };
const TOGGLE = "TOGGLE";
const reducer = (draft, { type }) => {
  switch (type) {
    case TOGGLE:
      if (draft.isLight) {
        draft.theme = darkTheme;
        draft.isLight = false;
      } else {
        draft.theme = lightTheme;
        draft.isLight = true;
      }
      break;
    default:
      break;
  }
};
export const { useValues, useActions } = createSlice(
  reducer,
  initialState,
  name,
  (useDispatch) => () => {
    const dispatch = useDispatch();
    const toggle = () => dispatch({ type: TOGGLE });
    return { [name]: { toggle } };
  }
);
