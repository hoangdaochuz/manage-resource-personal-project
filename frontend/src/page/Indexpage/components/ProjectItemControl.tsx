import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { FC, useState } from "react";
import { createUseStyles } from "react-jss";
import { useAppDispatch } from "../../../redux/hooks";
import { toast } from "react-toastify";
import confirm from "antd/es/modal/confirm";
import EditFolderModal from "../../../components/modals/EditFolderModal";
import { deleteProject } from "../../../redux/features/project/projectThunk";
export type ProjectItemControlProps = {
  workspaceId: number;
  projectId: number;
};
const ProjectItemControl: FC<ProjectItemControlProps> = ({ projectId, workspaceId }) => {
  const [isOpenEditModal, setOpenEditModal] = useState(false);

  const spaceItems = [
    {
      key: "rename",
      label: "Rename",
      icon: <EditOutlined />,
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
      title: "Delete folder?",
      icon: <ExclamationCircleFilled style={{ color: "red" }} />,
      content: "Do you want to delete this folder?",
      onOk() {
        dispatch(deleteProject({ projectId, workspaceId }))
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
            <div className={classes.projectItemControlItem} onClick={() => handleControlOption(item.key)}>
              <span>{item.icon}</span>
              <h2>{item.label}</h2>
            </div>
          );
        })}
      </div>
      <EditFolderModal
        isOpen={isOpenEditModal}
        setOpen={setOpenEditModal}
        workspaceId={workspaceId}
        projectId={projectId}
      />
    </>
  );
};
const useStyles = createUseStyles({
  projectItemControlItem: {
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

export default ProjectItemControl;
