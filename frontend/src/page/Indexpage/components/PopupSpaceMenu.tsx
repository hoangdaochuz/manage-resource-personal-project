import { createUseStyles } from "react-jss";
import DnDMenu, { CreateFolderData } from "./DnDMenu";
import { EllipsisOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import SearchSpace from "./SearchSpace";
import { Popover } from "antd";
import SpaceControlPopover from "./SpaceControlPopover";
import { FC, RefObject, useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

type PopupSpaceMenuProps = {
  searchSpace: boolean;
  setShowAddSpaceModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenWorkspaceControl: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenWorkspaceControl: boolean;
  setSearchSpace: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateFolderData: (arg: CreateFolderData) => void;
  collapsed: boolean;
  setToggleOpenSpaceMenu: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpenSpaceMenu: boolean;
  excludeRef: RefObject<HTMLElement>;
};

const PopupSpaceMenu: FC<PopupSpaceMenuProps> = ({
  searchSpace,
  setShowAddSpaceModal,
  setOpenWorkspaceControl,
  isOpenWorkspaceControl,
  setSearchSpace,
  setCreateFolderData,
  collapsed,
  setToggleOpenSpaceMenu,
  toggleOpenSpaceMenu,
  excludeRef,
}) => {
  const classes = useStyles();
  const refMenuPopup = useRef(null);
  useOnClickOutside(
    refMenuPopup,
    () => {
      if (!toggleOpenSpaceMenu) return;
      setToggleOpenSpaceMenu(false);
    },
    excludeRef
  );
  return (
    <div className={classes.menuAfterCollapseContainer} ref={refMenuPopup}>
      {!searchSpace ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ fontWeight: 500 }}>Spaces</h1>
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
                open={isOpenWorkspaceControl}
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
      )}
      <DnDMenu setCreateFolderData={setCreateFolderData} collapsed={collapsed} />
    </div>
  );
};

const useStyles = createUseStyles({
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
});

export default PopupSpaceMenu;
