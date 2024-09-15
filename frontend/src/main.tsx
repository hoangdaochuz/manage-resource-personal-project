import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginForm from "./page/Authenticate/components/LoginForm.tsx";
import LogupForm from "./page/Authenticate/components/LogupForm.tsx";
import ForgotPassword from "./page/Authenticate/components/ForgotPassword.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmEmailNoti from "./page/Authenticate/components/ConfirmEmailNoti.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthGoogleRedirect from "./page/Authenticate/components/AuthGoogleRedirect.tsx";
import ResetPassword from "./page/Authenticate/components/ResetPassword.tsx";
import CreateSite from "./page/CreateSite/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/logup",
    element: <LogupForm />,
  },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/confirm-noti", element: <ConfirmEmailNoti /> },
  { path: "auth/google-redirect", element: <AuthGoogleRedirect /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/create-site", element: <CreateSite /> },
]);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </QueryClientProvider>
);
