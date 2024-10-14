import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { authApi } from "./services/auth/authApi";
import appReducer from "./features/app/appSlice";
import workspaceReducer from "./features/workspace/workspaceSlice";
import projectReducer from "./features/project/projectSlice";
import siteReducer from "./features/site/siteSlice";
export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    workspace: workspaceReducer,
    project: projectReducer,
    site: siteReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
