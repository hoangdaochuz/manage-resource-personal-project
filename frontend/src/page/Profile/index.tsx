import { useEffect, useState } from "react";
import ProfileOverview from "./components/ProfileOverview";
import eventBus, { ACTIONS } from "../../eventBus";
import { createUseStyles } from "react-jss";
import { CloseOutlined } from "@ant-design/icons";
import ProfileTab from "./components/ProfileTab";

const Profile = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpenProfilePopup = () => {
    setOpen(true);
  };

  useEffect(() => {
    eventBus.on(ACTIONS.OPEN_PROFILE_POPUP, handleOpenProfilePopup);
    return () => {
      eventBus.off(ACTIONS.OPEN_PROFILE_POPUP, handleOpenProfilePopup);
    };
  }, []);

  return (
    open && (
      <div className={classes.profileContainer}>
        <div style={{ width: "100%", height: "5px", backgroundColor: "#7f77f1" }}></div>
        <div
          className={classes.closeProfilePopupContainer}
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseOutlined style={{ color: "#979797" }} />
        </div>
        <ProfileOverview />
        <ProfileTab />
      </div>
    )
  );
};
const useStyles = createUseStyles({
  "@keyframes rightToLeft": {
    "0%": {
      right: "-700px",
      bottom: 0,
    },
    "100%": {
      right: "0px",
      bottom: 0,
    },
  },

  profileContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    minWidth: 700,
    background: "#f7f8f9",
    boxShadow: "0px 10px #ccc",
    zIndex: 1500, // default z-index popover of antd is 1000, so this helps hide popover's antd. (I dont like to change default css of antd ^^)
    animationName: "$rightToLeft",
    animationDuration: "0.5s",
  },
  closeProfilePopupContainer: {
    position: "absolute",
    top: "10px",
    left: "-60px",
    background: "#fff",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    boxShadow: "0 1px 15px #00000012",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
});

export default Profile;
