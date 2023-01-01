import { createSlice } from "react-context-slices";

export const name = "user";
const initialState = { user: null };
const SET = "SET";
const reducer = (draft, { type, payload }) => {
  switch (type) {
    case SET:
      draft.user = payload;
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
    const set = (payload) => dispatch({ type: SET, payload });
    return { [name]: { set } };
  }
);
