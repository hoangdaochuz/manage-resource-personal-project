import { createUseStyles } from "react-jss";
import UserManagementHeader from "./components/UserManagementHeader";
import InviteUserModal from "./components/InviteUserModal";

const UserManagement = () => {
  const classes = useStyles();
  return (
    <>
      <div>
        <UserManagementHeader />
      </div>
      <InviteUserModal />
    </>
  );
};

const useStyles = createUseStyles({
  userManagementTitle: {
    fontSize: 18,
    fontWeight: 500,
  },
});

export default UserManagement;
