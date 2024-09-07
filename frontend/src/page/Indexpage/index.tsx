import {
  AuditOutlined,
  EllipsisOutlined,
  DashboardOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Avatar, Image, Layout, Menu, Popover, Tooltip } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import SpaceControlPopover from "./components/SpaceControlPopover";
import SearchSpace from "./components/SearchSpace";
import AddWorkspaceModal from "../../components/modals/AddWorkspaceModal";
import CreateFolderModal from "../../components/modals/CreateFolderModal";
import DnDMenu, { CreateFolderData } from "./components/DnDMenu";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutThunk } from "../../redux/features/auth/authThunk";
import { useNavigate } from "react-router-dom";
import PopupSpaceMenu from "./components/PopupSpaceMenu";
import UserManagement from "../UserManagement";

const IndexPage = () => {
  const [searchSpace, setSearchSpace] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [isShowAddSpaceModal, setShowAddSpaceModal] = useState<boolean>(false);
  const [createFolderData, setCreateFolderData] = useState({} as CreateFolderData);
  const [isOpenWorkspaceControl, setOpenWorkspaceControl] = useState<boolean>(false);
  const [toggleOpenSpaceMenu, setToggleOpenSpaceMenu] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const spaceIconRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [isAuthen, setIsAuthen] = useState(localStorage.getItem("accessToken"));
  useEffect(() => {
    if (!user && !isAuthen) {
      navigate("/login", { replace: true });
    }
  }, [user, isAuthen, navigate]);

  const _items = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "whiteboard",
      label: "Whiteboards",
      icon: <AuditOutlined />,
    },
    {
      key: "timesheet",
      label: "Timesheets",
      icon: <FieldTimeOutlined />,
    },
    {
      key: "user",
      label: "Users",
      icon: <UserOutlined />,
    },
    {
      key: "team",
      label: "Teams",
      icon: <TeamOutlined />,
    },
    { type: "divider" },
    {
      label: !searchSpace ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1>Spaces</h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0 10px" }}>
            <span
              style={{
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              <Popover
                placement="bottom"
                trigger="click"
                content={
                  <SpaceControlPopover
                    setOpenAddWorkspaceModal={setShowAddSpaceModal}
                    setOpenWorkspaceControl={setOpenWorkspaceControl}
                  />
                }
                open={isOpenWorkspaceControl && !toggleOpenSpaceMenu}
                onOpenChange={() => setOpenWorkspaceControl((prev) => !prev)}
              >
                <EllipsisOutlined />
              </Popover>
            </span>
            <span
              style={{
                display: "inline-block",
                cursor: "pointer",
              }}
              onClick={() => setSearchSpace((prev) => !prev)}
            >
              <SearchOutlined />
            </span>
            <span
              style={{
                display: "inline-block",
                cursor: "pointer",
              }}
              onClick={() => setShowAddSpaceModal(true)}
            >
              <PlusOutlined />
            </span>
          </div>
        </div>
      ) : (
        <SearchSpace setSearchSpace={setSearchSpace} />
      ),
      type: "group",
    },
    { type: "divider" },
  ] as ItemType<MenuItemType>[];

  const switchComponent = (key: string) => {
    switch (key) {
      case "home":
        return <div>Home</div>;
      case "dashboard":
        return <div>Dashboard</div>;
      case "whiteboard":
        return <div>White board</div>;
      case "timesheet":
        return <div>Timesheets</div>;
      case "user":
        return <UserManagement />;
      case "team":
        return <div>Teams</div>;
      case "files":
        return <div>File</div>;
      default:
        return <div>Option 2</div>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }} className={classes.layoutContainer}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
        }}
        width={250}
      >
        <div className={classes.logoContainer}>
          <Image width={50} src="https://clickup.com/assets/brand/clickup-logo-gradient.png" />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["home"]}
          mode="inline"
          // inlineCollapsed={true}
          items={_items}
          onClick={(e) => setSelectedKey(e.key)}
          openKeys={openKeys}
          onOpenChange={(openKeys) => {
            setOpenKeys(openKeys);
          }}
          className={classes.menuContainer}
          triggerSubMenuAction="click"
        />
        {!collapsed && (
          <DnDMenu
            setCreateFolderData={setCreateFolderData}
            collapsed={collapsed}
            toggleOpenSpaceMenu={toggleOpenSpaceMenu}
          />
        )}

        {collapsed && (
          <Tooltip placement="right" title="Spaces">
            <div
              className={classes.collapseIconContainer}
              onClick={() => setToggleOpenSpaceMenu((prev) => !prev)}
              ref={spaceIconRef}
            >
              <AppstoreOutlined style={{ fontSize: "16px" }} />
            </div>
          </Tooltip>
        )}
      </Sider>
      {collapsed && toggleOpenSpaceMenu && (
        <PopupSpaceMenu
          collapsed={collapsed}
          isOpenWorkspaceControl={isOpenWorkspaceControl}
          searchSpace={searchSpace}
          setCreateFolderData={setCreateFolderData}
          setOpenWorkspaceControl={setOpenWorkspaceControl}
          setSearchSpace={setSearchSpace}
          setShowAddSpaceModal={setShowAddSpaceModal}
          setToggleOpenSpaceMenu={setToggleOpenSpaceMenu}
          toggleOpenSpaceMenu={toggleOpenSpaceMenu}
          excludeRef={spaceIconRef}
        />
      )}
      <Layout>
        <Header className={classes.headerContainer}>
          <Popover
            placement="bottom"
            trigger="click"
            overlayClassName={classes.popoverContainer}
            content={
              <div>
                <ul className={classes.accountControlContainer}>
                  <li className={classes.accountControlOption}>My profile</li>
                  <li
                    className={classes.accountControlOption}
                    onClick={() => {
                      dispatch(logoutThunk());
                      setIsAuthen(null);
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            }
          >
            <Avatar size="large" icon={<UserOutlined />} style={{ cursor: "pointer" }} />
          </Popover>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: "24px 0px",
              minHeight: 360,
            }}
          >
            {switchComponent(selectedKey)}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
      <AddWorkspaceModal isOpen={isShowAddSpaceModal} setOpen={setShowAddSpaceModal} />
      <CreateFolderModal data={createFolderData} setCreateFolderData={setCreateFolderData} />
    </Layout>
  );
};

const useStyles = createUseStyles({
  layoutContainer: {
    "& .ant-layout-sider": {
      background: "white",
    },
    "& .ant-layout-sider-trigger": {
      background: "white",
      color: "black",
    },
    "& .ant-layout-header": {
      maxHeight: 51,
      padding: "0 18px",
    },
  },
  headerContainer: {
    background: "white",
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // borderBottom: "1px solid #ccc",
  },
  accountControlContainer: {
    listStyle: "none",
  },
  accountControlOption: {
    padding: "5px 12px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ccc",
    },
  },
  popoverContainer: {
    "& .ant-popover-inner": {
      padding: "12px 0px",
    },
  },
  menuContainer: {
    "& .ant-menu-submenu:hover.menu-sub-menuitem-control": {
      display: "flex",
    },
  },
  "@keyframes out-to-in": {
    "0%": {
      left: "0px",
    },
    "100%": {
      left: "80px",
    },
  },

  menuAfterCollapseContainer: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "white",
    height: "100vh",
    boxShadow: "2px 0px #efefef",
    zIndex: 1,
    position: "fixed",
    left: "80px",
    top: 0,
    borderLeft: "0.5px solid #ccc",
    animationName: "$out-to-in",
    animationDuration: "0.5s",
    borderTop: "0.5px solid #ccc",
  },
  collapseIconContainer: {
    display: "flex",
    margin: "3px",
    justifyContent: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    cursor: "pointer",
    backgroundColor: "#e5e4fc",
    borderRadius: "8px",
    // "&:hover": {},
  },
});

export default IndexPage;
