import { Button, Form, Input, Modal } from "antd";
import { FC, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editProjectThunk } from "../../redux/features/project/projectThunk";
import { toast } from "react-toastify";

type EditFolderModalProps = {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
  workspaceId: number;
  projectId: number;
};

type EditFolderPayload = {
  folderName: string;
  description: string;
};

const EditFolderModal: FC<EditFolderModalProps> = ({ isOpen, setOpen, workspaceId, projectId }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.project);
  const classes = useStyles();
  const { workspaces } = useAppSelector((state) => state.workspace);
  const currentWorkspace = workspaces.find((item) => item.id === workspaceId);
  const currentProject = (currentWorkspace?.projects || []).find((item) => item.id === projectId);

  const handleEditFolder = (data: EditFolderPayload) => {
    const { folderName, description } = data;
    const currentWorkspace = workspaces.find((workspace) => workspace.id === workspaceId);
    const currentProject = currentWorkspace?.projects?.find((project) => project.id === projectId);
    dispatch(
      editProjectThunk({
        id: projectId,
        data: {
          ...currentProject,
          name: folderName,
          description,
        },
      })
    )
      .then(() => {
        toast.success("Update folder successfully");
      })
      .catch(() => {
        toast.error("Update folder fail");
      })
      .finally(() => {
        setOpen(false);
      });
  };

  useEffect(() => {
    form.setFieldValue("folderName", currentProject?.name);
    form.setFieldValue("description", currentProject?.description);
  }, [form, currentProject]);

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={() => setOpen(false)}
        onOk={form.submit}
        footer={[
          <Button key={"cancel"} onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button key={"submit"} type="primary" onClick={form.submit} loading={isLoading}>
            Submit
          </Button>,
        ]}
      >
        <h1 className={classes.headerModal}>Edit Folder</h1>
        <Form form={form} layout="vertical" onFinish={handleEditFolder}>
          <Form.Item name="folderName" label="Folder Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const useStyles = createUseStyles({
  headerModal: {
    color: "#343434",
    display: "flex",
    fontSize: "24px",
    alignItems: "center",
    fontWeight: 400,
    lineHeight: 1,
    paddingTop: "20px",
    paddingBottom: "20px",
    justifyContent: "center",
  },
});
export default EditFolderModal;
