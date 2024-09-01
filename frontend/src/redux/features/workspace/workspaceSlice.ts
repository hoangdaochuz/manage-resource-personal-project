import { createSlice } from "@reduxjs/toolkit";
import { addWorkspace, deleteWorkspace, getMyWorkspaces, updateWorkspace } from "./workspaceThunk";

export type ProjectItem = {
  id: number;
  name: string;
  description: string;
  owner: number;
  order: number;
  workspaceId: number;
};

export type WorkspaceItem = {
  id: number;
  name: string;
  owner: number;
  order: number;
  projects?: ProjectItem[];
};

export type WorkspaceState = {
  workspaces: WorkspaceItem[];
  isLoading: boolean;
};

const INITIAL_STATE = {
  workspaces: [],
  isLoading: false,
} as WorkspaceState;

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState: INITIAL_STATE,
  reducers: {
    setWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    },

    addProjectToWorkspace: (state, action) => {
      const { workspaceId, project } = action.payload;
      state.workspaces.map((item) => {
        if (item.id === workspaceId) {
          item.projects?.push(project);
        } else {
          return item;
        }
      });
    },
    updateProjectInfoOfWorkspace: (state, action) => {
      const { workspaceId, projectId, updatedProject } = action.payload;
      state.workspaces.map((item) => {
        if (item.id === workspaceId) {
          const indexOfUpdateProject = item.projects?.findIndex((proj) => proj.id === projectId);
          if (typeof indexOfUpdateProject === "number" && indexOfUpdateProject >= 0) {
            item.projects?.splice(indexOfUpdateProject, 1, updatedProject);
          }
        } else {
          return item;
        }
      });
    },

    deleteProjectOfWorkspace: (state, action) => {
      const { workspaceId, projectId } = action.payload;
      const indexOfUpdateWorkspace = state.workspaces.findIndex((workspace) => workspace.id === workspaceId);
      const updateWorkspace = state.workspaces[indexOfUpdateWorkspace];
      const indexOfDeleteProject = updateWorkspace.projects?.findIndex((proj) => proj.id === projectId);
      if (typeof indexOfDeleteProject === "number" && indexOfDeleteProject >= 0) {
        updateWorkspace.projects?.splice(indexOfDeleteProject, 1);
        state.workspaces.splice(indexOfUpdateWorkspace, 1, updateWorkspace);
      }
    },

    setProjectOfWorkspace: (state, action) => {
      const { workspaceId, projects } = action.payload;
      state.workspaces.map((item) => {
        if (item.id === workspaceId) {
          item.projects = projects;
        } else {
          return item;
        }
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(addWorkspace.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addWorkspace.fulfilled, (state, action) => {
      state.isLoading = false;
      state.workspaces = [...state.workspaces, action.payload];
    });
    builder.addCase(addWorkspace.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getMyWorkspaces.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getMyWorkspaces.fulfilled, (state, action) => {
      state.workspaces = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getMyWorkspaces.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(deleteWorkspace.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteWorkspace.fulfilled, (state, action) => {
      state.isLoading = false;
      state.workspaces = state.workspaces.filter((item) => item.id !== action.payload.workspaceId);
    });
    builder.addCase(deleteWorkspace.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(updateWorkspace.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateWorkspace.fulfilled, (state, action) => {
      const payload = action.payload;
      state.isLoading = false;
      const indexItemUpdate = state.workspaces.findIndex((item) => item.id === payload.id);
      state.workspaces.splice(indexItemUpdate, 1, action.payload);
    });
  },
});

// export actions here
export const {
  setWorkspaces,
  addProjectToWorkspace,
  updateProjectInfoOfWorkspace,
  deleteProjectOfWorkspace,
  setProjectOfWorkspace,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
