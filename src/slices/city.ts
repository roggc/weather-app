import { createSlice, A, D } from "react-context-slices";

type S = {
  name: string;
};

export const name = "city";
const initialState = { name: "" };
const SET = "SET";
const reducer = (draft: D<S>, { type, payload }: A) => {
  switch (type) {
    case SET:
      draft.name = payload as string;
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
