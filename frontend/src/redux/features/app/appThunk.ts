import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../../services";
import { setUserInfo } from "../auth/authSlice";
import { getMyWorkspaces } from "../workspace/workspaceThunk";

export const initApp = createAsyncThunk("app/init", async (data, { rejectWithValue, dispatch }) => {
  try {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    if (userId && accessToken) {
      const userInfoRes = await userApi.getUserById(Number(userId));
      const userInfo = userInfoRes.data;
      dispatch(setUserInfo(userInfo));
      dispatch(getMyWorkspaces(Number(userId)));
    }
  } catch (e) {
    console.error(e);
    rejectWithValue(e);
  }
});
