import { createSlice, D, A } from "react-context-slices";

type S = { isLight: boolean };

export const name = "theme";
const initialState: S = { isLight: true };
const TOGGLE = "TOGGLE";
const reducer = (draft: D<S>, { type }: A) => {
  switch (type) {
    case TOGGLE:
      draft.isLight = !draft.isLight;
      break;
    default:
      break;
  }
};
export const { useValues, useActions } = createSlice<S, A>(
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
