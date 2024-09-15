import { Button, Input } from "antd";
import { createUseStyles } from "react-jss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { signSiteForUser } from "../../redux/features/site/siteThunk";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateSite = () => {
  const classes = useStyles();
  const currentUser = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();
  const [nameSite, setNameSite] = useState("");

  const handleCreateSite = async () => {
    try {
      if (currentUser?.id) {
        const createdSite = await dispatch(signSiteForUser({ name: nameSite, owner: currentUser?.id })).unwrap();
        console.log("🚀 ~ handleCreateSite ~ createdSite:", createdSite);
        toast.success("Sign site successfully");
      }
      // naviagte("/");
    } catch (err) {
      console.error(err);
      toast.error("Sign site fail");
    }
  };

  return (
    <div className={classes.createSiteContainer}>
      <div className={classes.createBody}>
        <div className={classes.createHeader}>
          <div style={{ width: 100, height: 50 }}>
            <img
              src="https://app-cdn.clickup.com/clickup_color-new.6bdf034d4532f5506afbfd1908e3ea03.svg"
              width={"100%"}
              height={"100%"}
            />
          </div>
        </div>
        <div className={classes.createFormContent}>
          <h1 className={classes.heading}>What would you like to name your Workspace?</h1>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px 0px" }}>
            <Input placeholder="Enter your site" value={nameSite} onChange={(e) => setNameSite(e.target.value)} />
            <span
              style={{
                fontSize: 14,
                color: "#adb3bd",
                textAlign: "center",
              }}
            >
              Try the name of your company or organization.
            </span>
          </div>
        </div>
        <div className={classes.createFooter}>
          <Button type="primary" size="large" onClick={handleCreateSite}>
            Submit
          </Button>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

const useStyles = createUseStyles({
  createSiteContainer: {
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
    display: "flex",
    alignItems: "center",
  },
  createHeader: {
    height: 100,
  },
  createBody: {
    width: 820,
    margin: "0 auto",
    backgroundColor: "white",
    padding: "30px 60px",
    borderRadius: "10px",
  },
  heading: {
    fontWeight: 500,
    fontSize: 32,
    lineHeight: "50px",
    textAlign: "center",
  },
  createFormContent: {
    maxWidth: 400,
    margin: "0 auto",
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 100,
  },
  createFooter: {
    float: "right",
  },
});

export default CreateSite;
