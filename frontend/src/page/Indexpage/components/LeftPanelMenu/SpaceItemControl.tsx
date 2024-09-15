import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import confirm from "antd/es/modal/confirm";
import { FC, useState } from "react";
import { createUseStyles } from "react-jss";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../redux/hooks";
import { deleteWorkspace } from "../../../../redux/features/workspace/workspaceThunk";
import EditWorkspaceModal from "../../../../components/modals/EditWorkspaceModal";

type SpaceItemControlProps = {
  workspaceId: number;
};

const SpaceItemControl: FC<SpaceItemControlProps> = ({ workspaceId }) => {
  const [isOpenEditModal, setOpenEditModal] = useState(false);

  const spaceItems = [
    {
      key: "rename",
      label: "Rename",
      icon: <EditOutlined />,
    },
    {
      key: "create",
      label: "Create new",
      icon: <PlusOutlined />,
    },
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
    },
  ];

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const showConfirmDeletePromise = async () => {
    confirm({
      title: "Delete workspace?",
      icon: <ExclamationCircleFilled style={{ color: "red" }} />,
      content: "Do you want to delete this workspace?",
      onOk() {
        dispatch(deleteWorkspace(workspaceId))
          .then(() => {
            toast.success("Delete successfully");
          })
          .catch((e) => {
            toast.error("Something went wrong!", e);
          });
      },
      onCancel() {},
    });
  };

  const handleControlOption = (option: string) => {
    switch (option) {
      case "rename":
        setOpenEditModal(true);
        break;
      case "create":
        break;
      case "delete":
        showConfirmDeletePromise();
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div>
        {spaceItems.map((item) => {
          return (
            <div className={classes.spaceItemControlItem} onClick={() => handleControlOption(item.key)}>
              <span>{item.icon}</span>
              <h2>{item.label}</h2>
            </div>
          );
        })}
      </div>
      <EditWorkspaceModal isOpen={isOpenEditModal} setOpen={setOpenEditModal} workspaceId={workspaceId} />
    </>
  );
};

const useStyles = createUseStyles({
  spaceItemControlItem: {
    display: "flex",
    alignItems: "center",
    gap: "0 5px",
    padding: "10px 5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f0f1f3",
      borderRadius: "5px",
    },
  },
});

export default SpaceItemControl;
