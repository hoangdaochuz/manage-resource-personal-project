import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { workspaceApi } from "../../../services";

export const getMyWorkspaces = createAsyncThunk(
  "workspace/getMyWorkspace",
  async ({ userId, siteId }: { userId: number; siteId: number }, { rejectWithValue }) => {
    try {
      const response = await workspaceApi.getMyWorkspace(userId, siteId);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const _err = e as AxiosError;
        return rejectWithValue(_err.response?.data);
      } else {
        return rejectWithValue((e as Error).message);
      }
    }
  }
);

export const addWorkspace = createAsyncThunk("workspace/add", async (data: object, { rejectWithValue }) => {
  try {
    const response = await workspaceApi.addWorkspace(data);
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

export type UpdateWorkspacePayload = {
  workspaceId: number;
  workspaceName: string;
  owner: number;
};

export const updateWorkspace = createAsyncThunk(
  "workspace/update",
  async (data: UpdateWorkspacePayload, { rejectWithValue }) => {
    try {
      const response = await workspaceApi.updateWorkspace(data.workspaceId, {
        name: data.workspaceName,
        owner: data.owner,
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const _err = e as AxiosError;
        return rejectWithValue(_err.response?.data);
      } else {
        return rejectWithValue((e as Error).message);
      }
    }
  }
);

export const deleteWorkspace = createAsyncThunk(
  "workspace/delete",
  async (workspaceId: number, { rejectWithValue }) => {
    try {
      const res = await workspaceApi.deleteWorkspace(workspaceId);
      return { res, workspaceId };
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        const _err = e as AxiosError;
        return rejectWithValue(_err.response?.data);
      } else {
        return rejectWithValue((e as Error).message);
      }
    }
  }
);
