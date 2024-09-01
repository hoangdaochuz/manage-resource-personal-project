import { FC, useState } from "react";
import { Draggable, DraggingStyle, Droppable, NotDraggingStyle } from "react-beautiful-dnd";
import { createUseStyles } from "react-jss";
import { MenuItem } from "./DnDMenu";
import DnDSubMenuItem from "./DnDSubMenuItem";
import { FolderOpenOutlined } from "@ant-design/icons";

type DnDParentMenuItemProps = {
  item: MenuItem;
  index: number;
};
interface StylesProps {
  isHideControl: boolean;
}
const DnDParentMenuItem: FC<DnDParentMenuItemProps> = ({ item, index }) => {
  const getDraggingItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
    background: isDragging ? "#e6f4ff" : "white",
    with: "100%",
    margin: 4,
    borderRadius: 10,
    color: isDragging ? "#1677FF" : "#000",
    ...draggableStyle,
  });
  const getMenuStyle = (isDragOver: boolean) => {
    return {
      backgroundColor: isDragOver ? "#f5f5f5" : "#fff",
    };
  };

  const [isToggleSubMenu, setToggleSubMenu] = useState(false);
  const [isHideControl, setHideControl] = useState(true);
  const classes = useStyles({ isHideControl });

  return (
    // key, dragganleId must be unique. Don't use index for key props, It will cause a error when dragging. Just using key for key props
    <Draggable key={item.key} draggableId={`${item.id}`} index={index} type="blockList">
      {(provider, snapshot) => {
        return (
          <div
            {...provider.draggableProps}
            {...provider.dragHandleProps}
            ref={provider.innerRef}
            style={getDraggingItemStyle(snapshot.isDragging, provider.draggableProps.style)}
            className={classes.menuItemContainer}
          >
            <div
              style={{ display: "flex", gap: "0 16px", width: "100%" }}
              onMouseEnter={() => setHideControl(false)}
              onMouseLeave={() => setHideControl(true)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0 12px",
                  width: "100%",
                  color: isToggleSubMenu ? "#1677FF" : "#000",
                }}
                onClick={() => setToggleSubMenu((prev) => !prev)}
              >
                {!isToggleSubMenu ? item.icon : <FolderOpenOutlined />}
                {item.label}
              </div>
              <div className={classes.menuItemControlcontainer}>{item.control}</div>
            </div>
            <Droppable droppableId={`${item.id}`} type="block">
              {(provider, snapshot) => {
                return (
                  <div
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                    style={{ ...getMenuStyle(snapshot.isDraggingOver), width: "100%" }}
                  >
                    {isToggleSubMenu &&
                      (item?.children || []).map((subItem, subIndex) => {
                        return <DnDSubMenuItem item={subItem} index={subIndex} parentIndex={item.id} />;
                      })}
                  </div>
                );
              }}
            </Droppable>
          </div>
        );
      }}
    </Draggable>
  );
};

const useStyles = createUseStyles({
  menuItemContainer: {
    display: "flex",
    margin: 4,
    alignItems: "center",
    flexDirection: "column",
    gap: "0 10px",
    paddingLeft: "24px",
    paddingRight: "6px",
    paddingBottom: 8,
    maxWidth: "240px",

    width: "100%",
    paddingTop: 8,
  },
  menuItemControlcontainer: (props: StylesProps) => {
    const { isHideControl } = props;
    return {
      visibility: isHideControl ? "hidden" : "visible",
    };
  },
});

export default DnDParentMenuItem;
