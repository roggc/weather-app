import { createSlice, D, A } from "react-context-slices";

type S = {
  user: any;
};

export const name = "user";
const initialState: S = { user: null };
const SET = "SET";
const reducer = (draft: D<S>, { type, payload }: A) => {
  switch (type) {
    case SET:
      draft.user = payload;
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
    const set = (payload: any) => dispatch({ type: SET, payload });
    return { [name]: { set } };
  }
);
