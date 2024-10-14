import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../../services";
import { setUserInfo } from "../auth/authSlice";
import { getMyWorkspaces } from "../workspace/workspaceThunk";
import { getSiteOfUserById } from "../site/siteThunk";

export const initApp = createAsyncThunk(
  "app/init",
  async ({ siteId, callback }: { siteId: number; callback: () => void }, { rejectWithValue, dispatch }) => {
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      if (userId && accessToken && siteId) {
        const userInfoRes = await userApi.getUserById(Number(userId));
        const userInfo = userInfoRes.data;
        dispatch(getSiteOfUserById({ siteId: Number(siteId), userId: Number(userId), callback }));
        dispatch(setUserInfo(userInfo));
        dispatch(getMyWorkspaces({ userId: Number(userId), siteId: Number(siteId) }));
      }
    } catch (e) {
      console.error(e);
      rejectWithValue(e);
    }
  }
);
