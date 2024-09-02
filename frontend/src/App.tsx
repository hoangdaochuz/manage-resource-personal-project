import "./App.css";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { logoutThunk } from "./redux/features/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { initApp } from "./redux/features/app/appThunk";
import IndexPage from "./page/Indexpage";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [isAuthen, setIsAuthen] = useState(localStorage.getItem("accessToken"));
  useEffect(() => {
    if (!user && !isAuthen) {
      navigate("/login", { replace: true });
    }
  }, [user, isAuthen, navigate]);

  useEffect(() => {
    dispatch(initApp());
  }, [dispatch]);
  return (
    <div>
      <Button
        onClick={() => {
          dispatch(logoutThunk());
          setIsAuthen(null);
        }}
      >
        Logout
      </Button>
      <Button>Fetch My Profile</Button>
      <IndexPage />
    </div>
  );
}

export default App;
