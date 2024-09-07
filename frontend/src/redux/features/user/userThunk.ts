import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
const url = `http://localhost:3000/api/v1/user`;
export const inviteUserToWorkspaceThunk = createAsyncThunk(
  "user/invite",
  async ({ emailFrom, emailTo }: { emailFrom: string; emailTo: string }, { rejectWithValue }) => {
    try {
      await axios.post(`${url}/invite`, {
        emailFrom,
        emailTo,
      });
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
