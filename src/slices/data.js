import { createSlice } from "react-context-slices";

export const name = "data";
const initialState = {
  [name]: {},
};
const SET = "SET";
const reducer = (draft, { type, payload }) => {
  switch (type) {
    case SET:
      draft[name][payload.apiCallKey] = payload.state;
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
