import { createSlice } from "@reduxjs/toolkit";
import { getSiteOfUserById } from "./siteThunk";

export interface Site {
  id: number;
  name: string;
  owner: number;
}

interface SiteStateType {
  site: Site | null;
  isLoading: boolean;
}

const INITIAL_STATE: SiteStateType = {
  site: null,
  isLoading: false,
};

const siteSlice = createSlice({
  name: "site",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getSiteOfUserById.pending, (state) => {
      // state.site = null;
      state.isLoading = true;
    });
    builder.addCase(getSiteOfUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.site = action.payload;
    });
    builder.addCase(getSiteOfUserById.rejected, (state) => {
      state.isLoading = false;
      state.site = null;
    });
  },
});

export default siteSlice.reducer;
