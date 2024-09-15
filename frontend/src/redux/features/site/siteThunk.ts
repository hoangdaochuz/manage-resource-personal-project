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
