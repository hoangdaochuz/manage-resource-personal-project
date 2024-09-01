import { createSlice } from "@reduxjs/toolkit";
import { createProjet, deleteProject, editProjectThunk } from "./projectThunk";

interface Project {
  id: number | null;
  name: string;
  description: string;
  owner: number | null;
  order: number | null;
  workspaceId: number | null;
}

type ProjectSliceState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  projects: Project[];
};

const INITIAL_STATE: ProjectSliceState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  projects: [],
};

export const projectSlice = createSlice({
  name: "projectSlice",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createProjet.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(createProjet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = [...state.projects, action.payload];
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(createProjet.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });

    builder.addCase(editProjectThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(editProjectThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(editProjectThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    builder.addCase(deleteProject.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(deleteProject.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteProject.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

// export {} = projectSlice.actions
export default projectSlice.reducer;
