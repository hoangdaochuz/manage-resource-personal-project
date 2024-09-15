import { CopyOutlined, DownOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Tag } from "antd";
import { createUseStyles } from "react-jss";
import { useAppSelector } from "../../../redux/hooks";
import dayjs from "dayjs";

const ProfileOverview = () => {
  const classes = useStyles();
  const { user } = useAppSelector((state) => state.auth);
  const online = true;
  return (
    <div className={classes.profileOverviewContainer}>
      <div className={classes.profileAvatar}>
        <Avatar style={{ backgroundColor: "red" }} size={64}>
          K
        </Avatar>
        {online ? (
          <div
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "green",
              bottom: 50,
              right: -3,
              border: "5px solid #fff",
            }}
          ></div>
        ) : (
          <div
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#fff",
              bottom: 50,
              right: -3,
              border: "5px solid #ccc",
            }}
          ></div>
        )}
      </div>
      <div className={classes.profileInfo}>
        <div className={classes.profileNameStatusContainer}>
          <div className={classes.nameContainer}>
            <Button
              type="text"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0px 4px",
              }}
            >
              <h2 className={classes.nameTypo}>{user?.username}</h2>
              <div>
                <DownOutlined />
              </div>
            </Button>
          </div>
          <div className={classes.profileOnlineStatus}>
            <Tag color="success">Online</Tag>
          </div>
        </div>
        <div className={classes.profileOtherInfoContainer}>
          <div className={classes.profileOtherInfoItem}>
            <h1 className={classes.profileInfoTitle}>Title</h1>
            <Input size="small" style={{ color: "#656f7d" }} />
          </div>
          <div className={classes.profileOtherInfoItem}>
            <h1 className={classes.profileInfoTitle}>Email</h1>
            <div
              style={{ display: "flex", gap: "0 5px", marginBottom: 5, color: "#656f7d" }}
              className={classes.profileEmailContainer}
            >
              <span>{user?.email}</span>
              <div className={classes.copyEmailIcon}>
                <CopyOutlined style={{ cursor: "pointer" }} />
              </div>
            </div>
          </div>

          <div className={classes.profileOtherInfoItem}>
            <h1 className={classes.profileInfoTitle}>Local time</h1>
            <span style={{ marginBottom: 5, color: "#656f7d" }}>{dayjs().format("HH:mm a")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  profileOverviewContainer: {
    display: "flex",
    padding: "24px 32px 0px",
    gap: "0px 10px",
  },
  profileAvatar: {
    position: "relative",
  },
  profileInfo: {
    flex: 1,
  },
  profileNameStatusContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameContainer: {
    display: "flex",
  },
  profileOnlineStatus: {},
  nameTypo: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "26px",
  },
  profileOtherInfoContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 15px",
    minHeight: 80,
  },
  profileOtherInfoItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  profileInfoTitle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "22px",
  },
  copyEmailIcon: {
    visibility: "hidden",
  },
  profileEmailContainer: {
    maxWidth: 200,
    "&:hover $copyEmailIcon": {
      visibility: "visible",
    },
  },
});

export default ProfileOverview;
