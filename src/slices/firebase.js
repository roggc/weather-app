import { createSlice } from "react-context-slices";

export const name = "firebase";
const initialState = { [name]: null };
const SET_ONCE = "SET_ONCE";
const reducer = (draft, { type, payload }) => {
  switch (type) {
    case SET_ONCE:
      if (!draft[name]) {
        draft[name] = payload;
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
    const setOnce = (value) => dispatch({ type: SET_ONCE, payload: value });
    return { [name]: { setOnce } };
  }
);
