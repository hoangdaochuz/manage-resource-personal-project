import { GoogleOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { createUseStyles } from "react-jss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { signinThunk } from "../../../redux/features/auth/authThunk";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { siteApi } from "../../../services";
import { Site } from "../../../redux/features/site/siteSlice";

const LoginForm = () => {
  const classes = useStyle();
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { error, isError, isLoading, isSuccess, user } = authState;
  const navigate = useNavigate();
  interface LoginData {
    email: string;
    password: string;
  }
  const handleSubmit = (data: LoginData) => {
    dispatch(signinThunk(data));
  };

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      const currSiteId = localStorage.getItem("siteId");

      if (isSuccess && user) {
        toast.success("Login successfully");
        const sitesOfUserRes = await siteApi.getSitesOfUser(Number(userId));
        const sitesOfUser = sitesOfUserRes.data;
        if (!(sitesOfUser || []).length) {
          navigate("/create-site");
        } else if (
          (sitesOfUser || []).length &&
          (!(sitesOfUser || []).find((item: Site) => item.id === Number(currSiteId)) || !currSiteId)
        ) {
          navigate(`/site/${sitesOfUser[0].id}`);
          localStorage.setItem("siteId", sitesOfUser[0].id);
        } else {
          navigate(`/site/${currSiteId}`);
        }
      } else {
        toast.error((error as Error).message);
      }
    })();
  }, [isError, isSuccess, error, user, navigate]);

  return (
    <div className={classes.authenContainer}>
      <div className={classes.loginForm}>
        <h1 className={classes.headerLogin}>Welcome back!</h1>
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
          <div style={{ marginBottom: 26 }}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!", min: 8, max: 16 }]}
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
              Log In
            </Button>
          </Form.Item>
          <a
            style={{
              display: "block",
              padding: "4px 15px",
              backgroundColor: "white",
              border: "1px solid #ccc",
              textAlign: "center",
              color: "#000",
              borderRadius: "4px",
            }}
            href={`${import.meta.env.VITE_AUTH_ENDPOINT}`}
          >
            Login with Google
            <span
              style={{
                display: "inline-block",
                marginLeft: "5px",
              }}
            >
              <GoogleOutlined />
            </span>
          </a>
          <Button style={{ textAlign: "center", width: "100%" }} type="link" href="forgot-password">
            Forgot Password?
          </Button>
          <div className={classes.formFooter}>
            <p>Don't have an account? </p>{" "}
            <Button type="link" href="/logup">
              Log Up
            </Button>
          </div>
        </Form>
      </div>
      {/* <ToastContainer /> */}
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

export default LoginForm;
