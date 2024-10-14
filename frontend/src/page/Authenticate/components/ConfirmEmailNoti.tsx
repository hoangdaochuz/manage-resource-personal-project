import { createUseStyles } from "react-jss";
import { useQuery } from "react-query";
import { authApi } from "../../../services";
import { Spin } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserInfo } from "../../../redux/features/auth/authSlice";

const ConfirmEmailNoti = () => {
  const classes = useStyles();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const confirmEmailFunc = async () => {
    if (token) {
      const data = await authApi.confirmEmail(token);
      return data;
    }
  };

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["confirmEmail"],
    queryFn: confirmEmailFunc,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Some thing went wrong");
    }
    if (data?.status === 201) {
      console.log("🚀 ~ useEffect ~ data:", data);
      dispatch(setUserInfo(data.data));
      navigate("/create-site");
      // navigate("/login");
    }
  }, [isError, data, navigate, dispatch]);

  return isLoading || isFetching ? (
    <Spin size="large" />
  ) : (
    <div className={classes.authenContainer}>
      <div className={classes.confirmContainer}>
        <h1 className={classes.notiTitle}>Confirm Email Notification</h1>
        <p>Please confirm your email address to complete your registration.</p>
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
  confirmContainer: {
    backgroundColor: "white",
    margin: "0 auto",
    height: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    padding: "20px",
  },
  notiTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
});

export default ConfirmEmailNoti;
