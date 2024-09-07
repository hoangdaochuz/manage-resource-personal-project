import UserManagementHeader from "./components/UserManagementHeader";
import InviteUserModal from "./components/InviteUserModal";

const UserManagement = () => {
  return (
    <>
      <div>
        <UserManagementHeader />
      </div>
      <InviteUserModal />
    </>
  );
};

export default UserManagement;
