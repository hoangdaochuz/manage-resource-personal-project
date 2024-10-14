import "./App.css";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { initApp } from "./redux/features/app/appThunk";
import IndexPage from "./page/Indexpage";
import { useNavigate, useParams } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();
  const { id: siteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      initApp({
        siteId: Number(siteId),
        callback: () => {
          navigate("/not-found-site");
        },
      })
    );
  }, [dispatch, navigate, siteId]);
  console.log("Hellooooooo------->>>>>>>");

  return (
    <div style={{ position: "relative" }}>
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
