import { createSlice } from "@reduxjs/toolkit";
import { initApp } from "./appThunk";

const INIT_APP_STATE = {
  loading: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState: INIT_APP_STATE,
  reducers: {
    testAction: () => {},
  },
  extraReducers(builder) {
    builder.addCase(initApp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(initApp.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(initApp.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { testAction } = appSlice.actions;
export default appSlice.reducer;
