import { BlockOutlined, PlusOutlined } from "@ant-design/icons";
import { FC } from "react";
import { createUseStyles } from "react-jss";

type SpaceControlPopoverProps = {
  setOpenAddWorkspaceModal: (arg: boolean) => void;
  setOpenWorkspaceControl: (arg: boolean) => void;
};

const SpaceControlPopover: FC<SpaceControlPopoverProps> = ({ setOpenAddWorkspaceModal, setOpenWorkspaceControl }) => {
  const controlItems = [
    {
      key: "createSpace",
      label: "Create space",
      icon: <PlusOutlined />,
    },
    {
      key: "manageSpace",
      label: "Manage space",
      icon: <BlockOutlined />,
    },
  ];

  const classes = useStyles();
  return (
    <div>
      {controlItems.map((item, key) => (
        <div
          key={key}
          className={classes.popoverContainer}
          onClick={() => {
            setOpenAddWorkspaceModal(true);
            setOpenWorkspaceControl(false);
          }}
        >
          <span>{item.icon}</span>
          <h2>{item.label}</h2>
        </div>
      ))}
    </div>
  );
};

const useStyles = createUseStyles({
  popoverContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "0 10px",
    padding: "5px 5px",
    cursor: "pointer",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#f0f1f3",
    },
  },
});

export default SpaceControlPopover;
