import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  name: string;
}

type Reducers = {
  setName: CaseReducer<State, PayloadAction<string>>;
}

const slice = createSlice<State, Reducers>({
  name: 'userInfo',
  initialState: {
    name: '',
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    }
  }
});

export const {
  setName,
} = slice.actions;

export default slice.reducer;