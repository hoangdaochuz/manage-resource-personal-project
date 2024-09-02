import { Form, Input, Modal } from "antd";
import { FC, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UpdateWorkspacePayload, updateWorkspace } from "../../redux/features/workspace/workspaceThunk";
import { toast } from "react-toastify";

type EditWorkspaceModalProps = {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
  workspaceId: number;
};
type UpdateSpacePayload = {
  spacename: string;
};

const EditWorkspaceModal: FC<EditWorkspaceModalProps> = ({ isOpen, setOpen, workspaceId }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const [form] = Form.useForm();
  const classes = useStyles();
  const { workspaces } = useAppSelector((state) => state.workspace);
  const currentWorkspace = workspaces.find((item) => item.id === workspaceId);

  useEffect(() => {
    form.setFieldValue("spacename", currentWorkspace?.name);
  }, [form, currentWorkspace]);

  const handleUpdateSpace = (data: UpdateSpacePayload) => {
    dispatch(
      updateWorkspace({
        owner: currentUser?.id,
        workspaceId,
        workspaceName: data.spacename,
      } as UpdateWorkspacePayload)
    )
      .then(() => {
        setOpen(false);
      })
      .catch((e) => {
        toast.error("Something went wrong", e);
      });
  };
  return (
    <Modal open={isOpen} onOk={form.submit} onCancel={() => setOpen(false)}>
      <h1 className={classes.modalHeader}>Edit Space name</h1>
      <Form layout="vertical" form={form} onFinish={handleUpdateSpace}>
        <Form.Item name="spacename" label="Space name" rules={[{ required: true }]}>
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
    lineHeight: 1,
    color: "#343434",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
});

export default EditWorkspaceModal;
