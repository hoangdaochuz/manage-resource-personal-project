import { Button, Form, Input, Modal } from "antd";
import { FC } from "react";
import { createUseStyles } from "react-jss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createProjet } from "../../redux/features/project/projectThunk";
import { toast } from "react-toastify";
import { CreateFolderData } from "../../page/Indexpage/components/LeftPanelMenu/DnDMenu";
type CreateFolderModalProps = {
  data: CreateFolderData;
  setCreateFolderData: (arg: CreateFolderData) => void;
};

type CreateFolderPayload = {
  folderName: string;
  description: string;
};

const CreateFolderModal: FC<CreateFolderModalProps> = ({ data, setCreateFolderData }) => {
  const [form] = Form.useForm();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.project);
  const { workspaces } = useAppSelector((state) => state.workspace);
  const currentWorkspace = workspaces.find((item) => item.id === data.workspaceId);
  const handleCreateFolder = (createFolderPayload: CreateFolderPayload) => {
    dispatch(
      createProjet({
        name: createFolderPayload.folderName,
        description: createFolderPayload.description,
        owner: user?.id,
        workspaceId: data.workspaceId,
        order: ((currentWorkspace?.projects || []).length + 1) * 100,
      })
    )
      .then(() => {
        toast.success("Add project to workspace successfully");
      })
      .catch(() => {
        toast.error("Add project to workspace fail");
      })
      .finally(() => {
        setCreateFolderData({ ...data, isShowCreateFolderModal: false });
        form.setFieldsValue([]);
      });
  };
  return (
    <Modal
      open={data.isShowCreateFolderModal}
      onOk={form.submit}
      onCancel={() => {
        setCreateFolderData({ ...data, isShowCreateFolderModal: false });
        form.setFieldsValue([]);
      }}
      destroyOnClose
      footer={[
        <Button
          key={"cancel"}
          onClick={() => {
            setCreateFolderData({ ...data, isShowCreateFolderModal: false });
            form.setFieldsValue([]);
          }}
        >
          Cancel
        </Button>,
        <Button key={"submit"} onClick={form.submit} loading={isLoading} type="primary">
          Submit
        </Button>,
      ]}
    >
      <h1 className={classes.modalHeader}>Create Folder</h1>
      <Form layout="vertical" form={form} onFinish={handleCreateFolder}>
        <Form.Item name="folderName" label="Folder Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const useStyles = createUseStyles({
  modalHeader: {
    fontSize: 24,
    fontWeight: 400,
    color: "#343434",
    textAlign: "center",
    marginBottom: "40px",
  },
});

export default CreateFolderModal;
