// create async logic

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { projectApi } from "../../../services";
import {
  addProjectToWorkspace,
  deleteProjectOfWorkspace,
  updateProjectInfoOfWorkspace,
} from "../workspace/workspaceSlice";

export const createProjet = createAsyncThunk("project/create", async (data: object, { rejectWithValue, dispatch }) => {
  try {
    const response = await projectApi.createProject(data);
    dispatch(addProjectToWorkspace({ workspaceId: response.data.workspaceId, project: response.data }));
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const _err = err as AxiosError;
      return rejectWithValue(_err.response?.data);
    } else {
      return rejectWithValue((err as Error).message);
    }
  }
});

export const editProjectThunk = createAsyncThunk(
  "project/edit",
  async ({ id, data }: { id: number; data: object }, { rejectWithValue, dispatch }) => {
    try {
      const response = await projectApi.updateProject(id, data);
      dispatch(
        updateProjectInfoOfWorkspace({
          workspaceId: response.data.workspaceId,
          projectId: response.data.id,
          updatedProject: response.data,
        })
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const _err = error as AxiosError;
        return rejectWithValue(_err.response?.data);
      } else {
        return rejectWithValue((error as Error).message);
      }
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/delete",
  async ({ projectId, workspaceId }: { projectId: number; workspaceId: number }, { rejectWithValue, dispatch }) => {
    try {
      const response = await projectApi.deleteProject(projectId);
      dispatch(deleteProjectOfWorkspace({ workspaceId, projectId }));
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
