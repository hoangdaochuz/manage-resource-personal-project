import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import { authApi } from "../../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const email = urlParams.get("email");

  type ResetPasswordPayload = {
    password: string;
  };
  const handleSubmit = async (data: ResetPasswordPayload) => {
    if (email && token) {
      setLoading(true);
      const res = await authApi.resetPassword(email, token, data.password);
      if (res.data.isSuccess) {
        toast.success("Reset password successfully");
        navigate("/login");
      } else {
        toast.error("Some thing went wrong");
      }
      setLoading(false);
    }
  };
  return (
    <div className={classes.authenContainer}>
      <div className={classes.resetPasswordForm}>
        <h1 className={classes.header}>Reset password!</h1>
        <Form layout="vertical" onFinish={handleSubmit}>
          <div style={{ marginBottom: 26 }}>
            <Form.Item
              label="New password"
              name="password"
              rules={[{ required: true, message: "Please input your password!", min: 8, max: 16 }]}
            >
              <Input.Password placeholder="Enter your new password" prefix={<LockOutlined />}></Input.Password>
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                marginBottom: "10px",
                height: 36,
              }}
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  authenContainer: {
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
    display: "flex",
    alignItems: "center",
  },
  resetPasswordForm: {
    width: 500,
    margin: "0 auto",
    backgroundColor: "white",
    padding: "30px 60px",
    borderRadius: "10px",
  },
  header: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
});

export default ResetPassword;
