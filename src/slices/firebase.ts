import { createSlice, A, D } from "react-context-slices";

type S = {
  app: any;
};

export const name = "firebase";
const initialState: S = { app: null };
const SET_ONCE = "SET_ONCE";
const reducer = (draft: D<S>, { type, payload }: A) => {
  switch (type) {
    case SET_ONCE:
      if (!draft.app) {
        draft.app = payload;
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
    const setOnce = (value: any) =>
      dispatch({ type: SET_ONCE, payload: value });
    return { [name]: { setOnce } };
  }
);
