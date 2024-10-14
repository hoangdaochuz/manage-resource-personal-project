import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi, userApi } from "../../../services";
import axios, { AxiosError } from "axios";
import { setUserInfo } from "./authSlice";
import { RootState } from "../../store";

export const signupThunk = createAsyncThunk("auth/signup", async (data: object, { rejectWithValue }) => {
  try {
    const response = await authApi.signup(data);
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return response.data;
  } catch (e) {
    console.error(e);
    if (axios.isAxiosError(e)) {
      const _err = e as AxiosError;
      return rejectWithValue(_err.response?.data);
    } else {
      return rejectWithValue((e as Error).message);
    }
  }
});

export const signinThunk = createAsyncThunk("auth/signin", async (data: object, { rejectWithValue }) => {
  try {
    const response = await authApi.signin(data);
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", response.data.id);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const _e = e as AxiosError;
      return rejectWithValue(_e.response?.data);
    } else {
      rejectWithValue((e as Error).message);
    }
  }
});

export const logoutThunk = createAsyncThunk("auth/logout", async (_, { dispatch, getState }) => {
  try {
    const rootState = getState() as RootState;
    const user = rootState.auth.user;
    console.log("🚀 ~ logoutThunk ~ user:", user);
    if (!user) return;
    if (user.loginType === "normal") {
      await authApi.logout();
    }
    dispatch(setUserInfo(null));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
  } catch (e) {
    console.error(e);
  }
});

export const loginWithGoogle = createAsyncThunk("auth/loginGoogle", async (_, { rejectWithValue }) => {
  try {
    const res = await authApi.loginWithGoogle();
    console.log(res.data);
  } catch (e) {
    console.error(e);
    if (axios.isAxiosError(e)) {
      const _e = e as AxiosError;
      return rejectWithValue(_e.response?.data);
    } else {
      rejectWithValue((e as Error).message);
    }
  }
});

interface UserCreatePayload {
  username: string;
  email: string;
  refreshToken: string;
  isActive: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  deleteAt?: Date | null;
  loginType: string;
}

export const createUserWhenLoginByGoogleThunk = createAsyncThunk(
  "user/create",
  async (user: UserCreatePayload, { rejectWithValue }) => {
    try {
      const currentUserRes = await userApi.getUserByEmail(user.email);
      if (currentUserRes.data.id) {
        localStorage.setItem("userId", currentUserRes.data.id);
        return currentUserRes.data;
      } else {
        const response = await userApi.createUser(user);
        localStorage.setItem("userId", response.data.id);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const _e = error as AxiosError;
        return rejectWithValue(_e.response?.data);
      } else {
        rejectWithValue((error as Error).message);
      }
    }
  }
);
