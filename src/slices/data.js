import { createSlice } from "lib/react-context-slices";

export const name = "data";
const initialState = {};
const SET = "SET";
const reducer = (draft, { type, payload }) => {
  switch (type) {
    case SET:
      draft[payload.apiCallKey] = payload.state;
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
    const set = (apiCallKey, state) =>
      dispatch({ type: SET, payload: { apiCallKey, state } });
    return { [name]: { set } };
  }
);
