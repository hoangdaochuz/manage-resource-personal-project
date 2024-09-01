import { createSlice } from "@reduxjs/toolkit";
import { createUserWhenLoginByGoogleThunk, signinThunk, signupThunk } from "./authThunk";

export interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  accessToken: string;
  refreshToken: string;
  loginType: string;
}

interface AuthState {
  user?: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: unknown;
  isError: boolean;
  isSuccess: boolean;
}

const INITIAL_STATE: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: "",
  isError: false,
  isSuccess: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: INITIAL_STATE,
  reducers: {
    logout: () => {
      localStorage.removeItem("");
      return INITIAL_STATE;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signupThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signupThunk.fulfilled, (state) => {
      // state.user = action.payload;
      state.error = "";
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(signupThunk.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
    });

    builder.addCase(signinThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signinThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = "";
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(signinThunk.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
    });

    builder.addCase(createUserWhenLoginByGoogleThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = "";
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
    });
  },
});

export const { logout, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
