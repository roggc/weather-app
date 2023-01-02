import { createSlice } from "lib/react-context-slices";

export const name = "dataKey";
const initialState = { value: "humidity" };
const SET = "SET";
const reducer = (draft, { type, payload }) => {
  switch (type) {
    case SET:
      draft.value = payload;
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
    const set = (value) => dispatch({ type: SET, payload: value });
    return { [name]: { set } };
  }
);
