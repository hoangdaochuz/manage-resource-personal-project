import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import { createUseStyles } from "react-jss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { signupThunk } from "../../../redux/features/auth/authThunk";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginData {
  fullName: string;
  email: string;
  password: string;
}

const LogupForm = () => {
  const { isLoading, isError, isSuccess, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const handleSubmit = (data: LoginData) => {
    dispatch(signupThunk(data));
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Signup successfully. Check your email and confirm your account");
    } else {
      toast.error((error as Error).message);
    }
  }, [isError, isSuccess, error]);
  return (
    <div className={classes.authenContainer}>
      {isSuccess && <Navigate to="/confirm-noti" replace={true} />}
      <div className={classes.logupForm}>
        <h1 className={classes.headerLogup}>Let's go!</h1>
        <Form onFinish={handleSubmit} layout="vertical">
          <div style={{ marginBottom: 26 }}>
            <Form.Item
              label="Full Name"
              name="username"
              rules={[{ required: true, message: "Please input your full name!" }]}
            >
              <Input placeholder="John Doe" prefix={<UserOutlined />}></Input>
            </Form.Item>
          </div>
          <div style={{ marginBottom: 26 }}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!", type: "email" }]}
            >
              <Input placeholder="Enter your email" prefix={<MailOutlined />}></Input>
            </Form.Item>
          </div>
          <div style={{ marginBottom: 26 }}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password! Minimun length from 8 to 16 characters",
                  min: 8,
                  max: 16,
                },
              ]}
            >
              <Input.Password placeholder="Enter password" prefix={<LockOutlined />}></Input.Password>
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
              loading={isLoading}
            >
              Play with ClickUp
            </Button>
          </Form.Item>
          <div className={classes.formFooter}>
            <p>Have an account? </p>{" "}
            <Button type="link" href="/login">
              Log In
            </Button>
          </div>
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
  logupForm: {
    width: 500,
    margin: "0 auto",
    backgroundColor: "white",
    padding: "30px 60px",
    borderRadius: "10px",
  },
  headerLogup: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  formFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default LogupForm;
