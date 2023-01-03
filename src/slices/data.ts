import { createSlice, A, D } from "react-context-slices";

type S = {
  [x: string]: any;
};

export const name = "data";
const initialState = {};
const SET = "SET";
const reducer = (draft: D<S>, { type, payload }: A) => {
  switch (type) {
    case SET:
      draft[payload.apiCallKey] = payload.state;
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
    const set = (
      apiCallKey: string,
      state: { data: any; isLoading: boolean; error: any }
    ) => dispatch({ type: SET, payload: { apiCallKey, state } });
    return { [name]: { set } };
  }
);
