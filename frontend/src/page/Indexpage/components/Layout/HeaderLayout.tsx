import { Header } from "antd/es/layout/layout";
import { createUseStyles } from "react-jss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { logoutThunk } from "../../../../redux/features/auth/authThunk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import eventBus, { ACTIONS } from "../../../../eventBus";
const HeaderLayout = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [isAuthen, setIsAuthen] = useState(localStorage.getItem("accessToken"));
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!user && !isAuthen) {
      navigate("/login", { replace: true });
    }
  }, [user, isAuthen, navigate]);
  return (
    <Header className={classes.headerContainer}>
      <Popover
        placement="bottom"
        trigger="click"
        overlayClassName={classes.popoverContainer}
        content={
          <div>
            <ul className={classes.accountControlContainer}>
              <li
                className={classes.accountControlOption}
                onClick={() => {
                  eventBus.emit(ACTIONS.OPEN_PROFILE_POPUP);
                }}
              >
                My profile
              </li>
              <li
                className={classes.accountControlOption}
                onClick={() => {
                  dispatch(logoutThunk());
                  setIsAuthen(null);
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        }
      >
        <Avatar size="large" icon={<UserOutlined />} style={{ cursor: "pointer" }} />
      </Popover>
    </Header>
  );
};

const useStyles = createUseStyles({
  headerContainer: {
    background: "white",
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
  },
  popoverContainer: {
    "& .ant-popover-inner": {
      padding: "12px 0px",
    },
  },
  accountControlContainer: {
    listStyle: "none",
  },
  accountControlOption: {
    padding: "5px 12px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ccc",
    },
  },
});
export default HeaderLayout;
