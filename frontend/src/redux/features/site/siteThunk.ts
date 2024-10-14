import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { siteApi } from "../../../services";

export const signSiteForUser = createAsyncThunk(
  "site/signSiteThunk",
  async ({ name, owner }: { name: string; owner: number }, { rejectWithValue }) => {
    try {
      const response = await siteApi.signSiteForUser({ name, owner });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const _err = err as AxiosError;
        return rejectWithValue(_err.response?.data);
      } else {
        return rejectWithValue((err as Error).message);
      }
    }
  }
);

export const getSiteOfUserById = createAsyncThunk(
  "site/getSiteById",
  async (
    { siteId, userId, callback }: { siteId: number; userId: number; callback: () => void },
    { rejectWithValue }
  ) => {
    try {
      const response = await siteApi.getSiteOfUserBySiteId(siteId, userId);
      return response.data;
    } catch (err) {
      console.log("🚀 ~ err----->>>>>:", err);
      callback();
      if (axios.isAxiosError(err)) {
        const _err = err as AxiosError;
        return rejectWithValue(_err.response?.data);
      } else {
        return rejectWithValue((err as Error).message);
      }
    }
  }
);
