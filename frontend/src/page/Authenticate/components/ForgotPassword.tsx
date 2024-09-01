import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { createUseStyles } from "react-jss";
import { authApi } from "../../../services";
import { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  type ForgotPassword = {
    email: string;
  };

  const [loading, setLoading] = useState(false);

  const classes = useStyle();
  const handleSubmit = async (data: ForgotPassword) => {
    setLoading(true);
    const res = await authApi.resetPasswordRequest(data.email);
    const isSuccess = res.data.isSuccess;
    if (isSuccess) {
      toast.success("Reset password request is sent to your email successfully!");
    } else {
      toast.error("Some thing went wrong");
    }
    setLoading(false);
  };
  return (
    <div className={classes.authenContainer}>
      <div className={classes.loginForm}>
        <h1 className={classes.headerLogin}>Forgot your password?</h1>
        <Form layout="vertical" onFinish={handleSubmit}>
          <div style={{ marginBottom: 26 }}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!", type: "email" }]}
            >
              <Input placeholder="Enter your email" prefix={<MailOutlined />}></Input>
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
              Send me the link
            </Button>
          </Form.Item>
          <Button style={{ width: "100%" }} type="link" href="/login">
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
};

const useStyle = createUseStyles({
  authenContainer: {
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
    display: "flex",
    alignItems: "center",
  },
  loginForm: {
    width: 500,
    margin: "0 auto",
    backgroundColor: "white",
    padding: "30px 60px",
    borderRadius: "10px",
  },
  formFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLogin: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
});

export default ForgotPassword;
