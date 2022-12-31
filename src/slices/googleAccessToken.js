import { createSlice } from "react-context-slices";

export const name = "googleAccessToken";
const initialState = { [name]: { value: undefined, setter: undefined } };
const SET_SETTER_ONLY_ONCE = "SET_SETTER_ONLY_ONCE";
const reducer = (draft, { type, payload }) => {
  switch (type) {
    case SET_SETTER_ONLY_ONCE:
      if (!draft[name].setter) {
        draft[name].setter = payload;
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
    const setSetterOnlyOnce = (value) =>
      dispatch({ type: SET_SETTER_ONLY_ONCE, payload: value });
    return { [name]: { setSetterOnlyOnce } };
  }
);
