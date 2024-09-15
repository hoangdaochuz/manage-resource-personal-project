import { Badge, Tabs, TabsProps } from "antd";
import { createUseStyles } from "react-jss";

const ProfileTab = () => {
  const classes = useStyles();
  const tabList: TabsProps["items"] = [
    {
      key: "mywork",
      label: (
        <Badge count={2} color="blue" size="default" className={classes.badge}>
          <h1>My work</h1>
        </Badge>
      ),
      children: <div>My work content</div>,
    },
    {
      key: "assigned",
      label: (
        <Badge count={8} color="blue" size="default" className={classes.badge}>
          <h1>Assigned</h1>
        </Badge>
      ),
      children: <div>Assigned content</div>,
    },
    {
      key: "calendar",
      label: (
        <Badge count={5} color="blue" size="default" className={classes.badge}>
          <h1>Calendar</h1>
        </Badge>
      ),
      children: <div>Calendar content</div>,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="mywork" items={tabList} className={classes.profileTabContainer} />
    </div>
  );
};

const useStyles = createUseStyles({
  profileTabContainer: {
    "& .ant-tabs-nav-wrap": {
      padding: "0px 32px",
    },
  },
  badge: {
    "& > sup": {
      right: "-10px !important",
      top: "-5px !important",
    },
  },
});

export default ProfileTab;
