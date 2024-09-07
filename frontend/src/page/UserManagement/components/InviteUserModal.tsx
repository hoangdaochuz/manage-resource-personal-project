import { Button, Form, Input, Modal, Select, Tooltip } from "antd";
import { useEffect, useMemo, useState } from "react";
import eventBus, { ACTIONS } from "../../../eventBus";
import { createUseStyles } from "react-jss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { inviteUserToWorkspaceThunk } from "../../../redux/features/user/userThunk";
import { toast } from "react-toastify";
type ModalState = {
  open: boolean;
  loading: boolean;
};

const InviteUserModal = () => {
  const [state, _setState] = useState<ModalState>({
    open: false,
    loading: false,
  });
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const setState = (obj: Partial<ModalState>) => _setState((prev) => ({ ...prev, ...obj }));
  const { email: emailFrom } = useAppSelector((state) => state.auth.user);
  const handleInviteUser = async (data: { email: string }) => {
    try {
      setState({ loading: true });
      await dispatch(inviteUserToWorkspaceThunk({ emailFrom, emailTo: data.email })).unwrap();
      setState({ loading: false });
      toast.success("Invite user successfully");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong when sending the email!");
    }
  };
  const handleCancel = () => {
    setState({ open: false });
  };

  const handleOpenModal = () => {
    setState({
      open: true,
    });
  };

  useEffect(() => {
    eventBus.on(ACTIONS.OPEN_INVITE_USER_MODAL, handleOpenModal);
    return () => {
      eventBus.off(ACTIONS.OPEN_INVITE_USER_MODAL, handleOpenModal);
    };
  });

  const roleOptions = useMemo(() => {
    return [
      {
        label: "Member",
        value: "member",
        desc: "Access to public Spaces, Docs and Dashboards.",
      },
      {
        label: "Admin",
        value: "admin",
        desc: "Manage Spaces, People, Billing and other Workspaces settings.",
      },
    ];
  }, []);

  const selectRoleAfter = useMemo(() => {
    return (
      <Select
        defaultValue="member"
        style={{ minWidth: 150 }}
        options={roleOptions}
        optionRender={(option) => {
          return (
            <div className={classes.optionRenderStyle}>
              <h2 className={classes.optionRenderTitle}>{option.data.label}</h2>
              <Tooltip title={option.data.desc} placement="rightTop">
                <p className={classes.optionRenderDesc}>{option.data.desc}</p>
              </Tooltip>
            </div>
          );
        }}
      />
    );
  }, [classes.optionRenderDesc, classes.optionRenderStyle, classes.optionRenderTitle, roleOptions]);
  const [form] = Form.useForm();

  return (
    <Modal
      title={
        <div className={classes.modalHeader}>
          <h1 className={classes.modalHeaderTitle}>Invite people</h1>
          <p className={classes.modalHeaderDes}>New members will gain access to public Spaces, Docs and Dashboards.</p>
        </div>
      }
      onOk={form.submit}
      onCancel={handleCancel}
      open={state.open}
      footer={[
        <Button key={"cancel"} onClick={handleCancel} type="text">
          Cancel
        </Button>,
        <Button key={"invite"} onClick={form.submit} type="primary" htmlType="submit" loading={state.loading}>
          Send invite
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleInviteUser}>
        <div className={classes.modalBody}>
          <Form.Item
            label="Invite by email"
            name="email"
            rules={[{ required: true, message: "Please input a valid email", type: "email" }]}
          >
            <Input
              className={classes.modalInput}
              placeholder="Email, comma or space separated"
              addonAfter={selectRoleAfter}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

const useStyles = createUseStyles({
  modalHeader: {},
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  modalHeaderDes: {
    fontSize: 12,
    fontWeight: 300,
  },
  modalBody: {
    marginTop: 18,
    marginBottom: 18,
  },
  modalBodyLabel: {
    fontSize: 13,
    fontWeight: 400,
  },
  modalInput: {
    marginTop: 8,
  },
  optionRenderStyle: {},
  optionRenderTitle: {
    fontSize: 14,
    fontWeight: 400,
  },
  optionRenderDesc: {
    fontSize: 12,
    fontWeight: 300,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
});

export default InviteUserModal;
