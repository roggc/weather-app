import { createSlice } from "lib/react-context-slices";

export const name = "theme";
const initialState = { isLight: true };
const TOGGLE = "TOGGLE";
const reducer = (draft, { type }) => {
  switch (type) {
    case TOGGLE:
      draft.isLight = !draft.isLight;
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
  },
  ["isLight"]
);
