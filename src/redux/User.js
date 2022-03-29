import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.data = action.payload;
    },
    RemoveUser: (state, action) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetUser, RemoveUser } = userSlice.actions;

export default userSlice.reducer;
