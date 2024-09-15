import { FC, useState } from "react";
import { Draggable, DraggingStyle, Droppable, NotDraggingStyle } from "react-beautiful-dnd";
import { MenuItem } from "./DnDMenu";
import DnDParentMenuItem from "./DnDParentMenuItem";
import { createUseStyles } from "react-jss";
type DnDSubMenuItemProps = {
  item: MenuItem;
  index: number;
  parentIndex: number | string;
};
interface StylesProps {
  isHideControl: boolean;
}
const DnDSubMenuItem: FC<DnDSubMenuItemProps> = ({ item, index, parentIndex }) => {
  const getMenuStyle = (isDragOver: boolean) => {
    return {
      backgroundColor: isDragOver ? "#f5f5f5" : "#fff",
      with: "100%",
    };
  };

  const [isHideControl, setHideControl] = useState(true);
  const classes = useStyles({ isHideControl });

  const getDraggingItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
    background: isDragging ? "#e6f4ff" : "white",
    margin: 4,
    borderRadius: 10,
    color: isDragging ? "#1677FF" : "#000",
    width: "100%",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  return (
    <Draggable key={`${parentIndex}-${item.key}`} draggableId={`${parentIndex}-${item.id}`} index={index}>
      {(provider, snapshot) => {
        return (
          <div
            {...provider.dragHandleProps}
            {...provider.draggableProps}
            ref={provider.innerRef}
            style={{ ...getDraggingItemStyle(snapshot.isDragging, provider.draggableProps.style), float: "left" }}
            // className={classes.menuDragItem}
          >
            <div
              className={classes.menuItemContainer}
              style={{ display: "flex", flexDirection: "row" }}
              onMouseEnter={() => setHideControl(false)}
              onMouseLeave={() => setHideControl(true)}
            >
              {item.icon}
              {item.label}
              <div className={classes.controlContainer}>{item.control}</div>
            </div>
            <Droppable droppableId={`sub-item-${item.id}`} type="blockList">
              {(provider, snapshot) => {
                return (
                  <div
                    {...provider.droppableProps}
                    ref={provider.innerRef}
                    style={getMenuStyle(snapshot.isDraggingOver)}
                  >
                    {(item?.children || []).map((_2ndSubIcon, _2ndIndex) => {
                      return <DnDParentMenuItem index={_2ndIndex} item={_2ndSubIcon} />;
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
    // margin: 4,
    alignItems: "center",
    flexDirection: "column",
    gap: "0 10px",
    paddingLeft: "24px",
    paddingRight: "16px",
    paddingBottom: 8,
    paddingTop: 8,
    "&:hover": {
      borderRadius: 10,
      backgroundColor: "#f0f0f0 !important",
    },
  },
  menuDragItem: {
    float: "left",
  },
  controlContainer: (props: StylesProps) => {
    const { isHideControl } = props;
    return {
      visibility: isHideControl ? "hidden" : "visible",
    };
  },
});
export default DnDSubMenuItem;
