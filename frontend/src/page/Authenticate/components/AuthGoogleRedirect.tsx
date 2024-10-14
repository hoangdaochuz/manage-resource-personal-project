import { Spin } from "antd";
import { authApi, siteApi } from "../../../services";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { createUserWhenLoginByGoogleThunk } from "../../../redux/features/auth/authThunk";
import { Site } from "../../../redux/features/site/siteSlice";

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
    (async () => {
      if (!data) return;

      const user = data.user;
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("refreshToken", user.refreshToken);
      const userCreated = await dispatch(
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
      ).unwrap();
      console.log("userCreated", userCreated);
      const userId = userCreated.id;
      const sitesOfUserRes = await siteApi.getSitesOfUser(userId);
      console.log("🚀 ~ sitesOfUserRes:", sitesOfUserRes);
      const sitesOfUser = sitesOfUserRes.data;
      const currentSiteId = localStorage.getItem("siteId");
      if (!(sitesOfUser || []).length) {
        navigate("/create-site");
      } else if (
        (sitesOfUser || []).length &&
        (!(sitesOfUser || []).find((item: Site) => item.id === Number(currentSiteId)) || !currentSiteId)
      ) {
        navigate(`/site/${sitesOfUser[0].id}`);
        localStorage.setItem("siteId", sitesOfUser[0].id);
      } else {
        navigate(`/site/${currentSiteId}`);
      }
    })();
  }, [data, dispatch, navigate]);

  return (
    <div>
      <Spin size="large" />
    </div>
  );
};

export default AuthGoogleRedirect;
