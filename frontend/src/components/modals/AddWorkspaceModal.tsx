import { Form, Input, Modal } from "antd";
import { FC } from "react";
import { createUseStyles } from "react-jss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addWorkspace } from "../../redux/features/workspace/workspaceThunk";

type AddWorkspaceModalProps = {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
};

type AddWorkspacePayload = {
  spacename: string;
};

const AddWorkspaceModal: FC<AddWorkspaceModalProps> = ({ isOpen, setOpen }) => {
  const { workspaces, isLoading } = useAppSelector((state) => state.workspace);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleAddWorkspace = (data: AddWorkspacePayload) => {
    dispatch(
      addWorkspace({
        name: data.spacename,
        order: (workspaces.length + 1) * 100,
        owner: user?.id,
      })
    ).then(() => {
      setOpen(false);
      form.setFieldsValue([]);
    });
  };
  const classes = useStyles();
  const [form] = Form.useForm();
  return (
    <Modal
      open={isOpen}
      onOk={form.submit}
      onCancel={() => {
        setOpen(false);
        form.setFieldsValue([]);
      }}
      confirmLoading={isLoading}
    >
      <div className={classes.headerModal}>
        <div>
          <svg width="123" height="97" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <circle fill="#7B67EE" cx="61.5" cy="56.5" r="39.5"></circle>
              <path d="M54.57 17.6A39.5 39.5 0 0 0 88.44 85.4 39.5 39.5 0 1 1 54.56 17.6z" fill="#6C5AD4"></path>
              <path
                d="M22.25 49.42a39.89 39.89 0 0 0-.54 10.1c-2.55 2.88-3.67 5.68-3.01 8.16 2.2 8.19 23.14 9.7 46.77 3.36 23.64-6.34 41.02-18.11 38.83-26.3-.73-2.74-3.57-4.73-7.9-5.93a39.65 39.65 0 0 0-5.3-7.98c17.32-.7 29.74 2.67 31.64 9.76 3.04 11.32-21.92 27.84-55.75 36.9C33.17 86.57 3.3 84.74.26 73.42c-1.88-7 6.96-16 21.99-24z"
                fill="#C1B6FF"
                opacity=".4"
              ></path>
              <path
                d="M22 50.97a39.7 39.7 0 0 0-.2 1.54C12.4 58.61 7.24 65.1 8.66 70.37c2.7 10.11 28.57 11.97 57.76 4.15 29.19-7.82 50.65-22.36 47.94-32.47-1.46-5.45-9.64-8.5-21.45-8.94-.26-.36-.54-.72-.82-1.08 15.21-.26 25.97 2.95 27.68 9.36 2.89 10.77-20.86 26.49-53.03 35.11-32.18 8.62-60.6 6.88-63.5-3.89C1.55 66.3 9.04 58.26 22 50.97zm-.32 3.13c-.05.72-.07 1.45-.08 2.18-5.35 4.38-8.05 8.78-7.05 12.5 2.4 9 25.38 10.64 51.3 3.7 25.94-6.95 45.01-19.87 42.6-28.85-1.05-3.94-6.05-6.47-13.52-7.48-.36-.6-.74-1.2-1.13-1.77 9.9.72 16.67 3.57 17.95 8.36 2.58 9.62-17.83 23.44-45.58 30.88-27.76 7.44-52.35 5.67-54.92-3.95-1.24-4.6 2.81-10.19 10.43-15.57z"
                fill="#C1B6FF"
                opacity=".4"
              ></path>
              <circle fill="#B4A7FF" cx="34.5" cy="29.5" r="12.5"></circle>
              <path d="M29.45 18.06a12.5 12.5 0 0 0 15.1 18.88 12.5 12.5 0 1 1-15.1-18.88z" fill="#9A8CED"></path>
              <path
                d="M104.72 6.72l1.84-5.24a1 1 0 0 1 1.88 0l1.84 5.24 5.24 1.84a1 1 0 0 1 0 1.88l-5.24 1.84-1.84 5.24a1 1 0 0 1-1.88 0l-1.84-5.24-5.24-1.84a1 1 0 0 1 0-1.88l5.24-1.84zM75.93 4.93l.63-1.8a1 1 0 0 1 1.88 0l.63 1.8 1.8.63a1 1 0 0 1 0 1.88l-1.8.63-.63 1.8a1 1 0 0 1-1.88 0l-.63-1.8-1.8-.63a1 1 0 0 1 0-1.88l1.8-.63zM17.78 92.78l.28-.8a1 1 0 0 1 1.88 0l.28.8.8.28a1 1 0 0 1 0 1.88l-.8.28-.28.8a1 1 0 0 1-1.88 0l-.28-.8-.8-.28a1 1 0 0 1 0-1.88l.8-.28z"
                fill="#E6E2FF"
              ></path>
            </g>
          </svg>
        </div>
        <h1 className={classes.headerTypography}>Create new Space</h1>
      </div>
      <div style={{ marginTop: 20 }}>
        <Form layout="vertical" form={form} onFinish={handleAddWorkspace}>
          <Form.Item label="Space name" name="spacename" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

const useStyles = createUseStyles({
  headerModal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  headerTypography: {
    fontSize: 24,
    fontWeight: 400,
  },
});

export default AddWorkspaceModal;
