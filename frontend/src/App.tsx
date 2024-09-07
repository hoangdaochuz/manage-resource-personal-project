import "./App.css";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { initApp } from "./redux/features/app/appThunk";
import IndexPage from "./page/Indexpage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initApp());
  }, [dispatch]);
  return (
    <div>
      {/* <Button
        onClick={() => {
          dispatch(logoutThunk());
        }}
      >
        Logout
      </Button> */}
      {/* <Button>Fetch My Profile</Button> */}
      <IndexPage />
    </div>
  );
}

export default App;
