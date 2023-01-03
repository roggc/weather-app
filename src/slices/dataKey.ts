import { createSlice, D, A } from "react-context-slices";

type S = {
  value: string;
};

export const name = "dataKey";
const initialState: S = { value: "humidity" };
const SET = "SET";
const reducer = (draft: D<S>, { type, payload }: A) => {
  switch (type) {
    case SET:
      draft.value = payload;
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
    const set = (value: string) => dispatch({ type: SET, payload: value });
    return { [name]: { set } };
  }
);
