import { Avatar, Button } from "antd";
import { createUseStyles } from "react-jss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../redux/features/auth/authThunk";
const NotFoundSite = () => {
  const { user } = useAppSelector((state) => state.auth);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div style={{ padding: "12px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className={classes.imageWrapper}>
          <img
            src="https://app-cdn.clickup.com/clickup_color-new.6bdf034d4532f5506afbfd1908e3ea03.svg"
            width={"100%"}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0 12px" }}>
          <div style={{ display: "flex", gap: "0 12px", alignItems: "center" }}>
            <Avatar style={{ backgroundColor: "red" }} size={32}>
              {user?.username[0]}
            </Avatar>
            <span>{user?.username}</span>
          </div>
          <Button
            onClick={() => {
              dispatch(logoutThunk());
              navigate("/login");
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
      <div
        style={{
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 200,
          borderRadius: "4px",
          border: "1px solid #ccc",
          padding: "20px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "32px 0px",
          }}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/1178/1178479.png" width={50} height={50} />
          <div>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 600,
                marginBottom: "20px",
              }}
            >
              This page is unavailable
            </h1>
            <p
              style={{
                fontSize: 14,
                fontWeight: 400,
              }}
            >
              You don't have access to this Workspace or it doesn't exist anymore.
            </p>
          </div>
          <Button type="primary" onClick={() => navigate(-2)}>
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  imageWrapper: {
    width: 95,
    height: "auto",
  },
});

export default NotFoundSite;
