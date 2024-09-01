import { Spin } from "antd";
import { authApi } from "../../../services";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { createUserWhenLoginByGoogleThunk } from "../../../redux/features/auth/authThunk";

const AuthGoogleRedirect = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleGetUserInfo = async () => {
    if (code) {
      const response = await authApi.loginGoogleRedirect(code);
      return response.data;
    }
  };
  const { data } = useQuery({
    queryKey: ["googleRedirect"],
    queryFn: handleGetUserInfo,
  });
  useEffect(() => {
    if (data) {
      const user = data.user;
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("refreshToken", user.refreshToken);
      dispatch(
        createUserWhenLoginByGoogleThunk({
          username: user.firstName + user.lastName,
          email: user.email,
          refreshToken: user.refreshToken,
          isActive: true,
          isVerified: true,
          isDeleted: false,
          deleteAt: null,
          loginType: "social",
        })
      );
      navigate("/");
    }
  }, [data, navigate]);
  return (
    <div>
      <Spin size="large" />
    </div>
  );
};

export default AuthGoogleRedirect;
