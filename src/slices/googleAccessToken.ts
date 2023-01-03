import { createSlice, A, D } from "react-context-slices";

type Setter =
  | ((value: string | ((val: string | null) => string | null) | null) => void)
  | undefined;

type S = {
  value: string | null;
  setter: Setter;
};

export const name = "googleAccessToken";
const initialState: S = { value: null, setter: undefined };
const SET_SETTER_ONLY_ONCE = "SET_SETTER_ONLY_ONCE";
const reducer = (draft: D<S>, { type, payload }: A) => {
  switch (type) {
    case SET_SETTER_ONLY_ONCE:
      if (!draft.setter) {
        draft.setter = payload;
      }
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
    const setSetterOnlyOnce = (value: Setter) =>
      dispatch({ type: SET_SETTER_ONLY_ONCE, payload: value });
    return { [name]: { setSetterOnlyOnce } };
  }
);
