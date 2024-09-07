import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { createUseStyles } from "react-jss";
import eventBus, { ACTIONS } from "../../../eventBus";

const UserManagementHeader = () => {
  const classes = useStyles();
  const handleClickInviteUser = () => {
    eventBus.emit(ACTIONS.OPEN_INVITE_USER_MODAL);
  };
  return (
    <div className={classes.userManagementHeader}>
      <h1 className={classes.userManagementTitle}>Users Management</h1>
      <Button type="primary" onClick={handleClickInviteUser}>
        <UserAddOutlined />
        Invite
      </Button>
    </div>
  );
};
const useStyles = createUseStyles({
  userManagementHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userManagementTitle: {
    fontSize: 18,
    fontWeight: 500,
  },
});

export default UserManagementHeader;
