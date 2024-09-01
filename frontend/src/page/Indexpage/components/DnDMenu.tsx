/* eslint-disable @typescript-eslint/no-unused-vars */
import { EllipsisOutlined, FolderOutlined, PlusOutlined, ProjectOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { FC } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import SpaceItemControl from "./SpaceItemControl";
import DnDParentMenuItem from "./DnDParentMenuItem";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { WorkspaceItem, setProjectOfWorkspace, setWorkspaces } from "../../../redux/features/workspace/workspaceSlice";
import { useMutation } from "react-query";
import { projectApi, workspaceApi } from "../../../services";
import ProjectItemControl from "./ProjectItemControl";

export type CreateFolderData = {
  isShowCreateFolderModal: boolean;
  workspaceId: number;
};

type DnDMenuProps = {
  setCreateFolderData: (arg: CreateFolderData) => void;
  collapsed: boolean;
  toggleOpenSpaceMenu?: boolean;
};

export type MenuItem = {
  id: string | number;
  key: string | number;
  label: JSX.Element | string;
  children?: MenuItem[];
  icon: JSX.Element;
  control?: JSX.Element;
};
const DnDMenu: FC<DnDMenuProps> = ({ setCreateFolderData }) => {
  const { workspaces = [] } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();
  const workSpaceData = workspaces.map(
    (item) =>
      ({
        id: item.id,
        key: item.id,
        label: (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flex: 1 }}>
            <h2>{item.name}</h2>
          </div>
        ),
        children: item.projects?.map((proj) => ({
          id: proj.id,
          key: proj.id,
          label: (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flex: 1 }}>
              <h2>{proj.name}</h2>
            </div>
          ),
          icon: <ProjectOutlined />,
          control: (
            <div style={{ display: "flex", alignItems: "center", gap: "0 3px", zIndex: 2 }}>
              <Popover
                trigger={"click"}
                placement="bottomRight"
                content={<ProjectItemControl workspaceId={item.id} projectId={proj.id} />}
              >
                <Button
                  size="small"
                  icon={<EllipsisOutlined />}
                  style={{ border: "none", backgroundColor: "transparent" }}
                />
              </Popover>
            </div>
          ),
        })),
        icon: <FolderOutlined />,
        control: (
          <div style={{ display: "flex", alignItems: "center", gap: "0 3px", zIndex: 2 }}>
            <Popover trigger={"click"} placement="bottomRight" content={<SpaceItemControl workspaceId={item.id} />}>
              <Button
                size="small"
                icon={<EllipsisOutlined />}
                style={{ border: "none", backgroundColor: "transparent" }}
              />
            </Popover>
            <Button
              size="small"
              icon={<PlusOutlined />}
              style={{ border: "none", backgroundColor: "transparent" }}
              onClick={() => {
                setCreateFolderData({
                  isShowCreateFolderModal: true,
                  workspaceId: item.id,
                });
              }}
            />
          </div>
        ),
      } as MenuItem)
  );
  const mutationWorkspaceReorder = useMutation((data: object) => workspaceApi.reorderWorkspace(data));
  const mutationProjectReorder = useMutation((data: object) => projectApi.reorderProject(data));

  const reorder = (list: Iterable<object>, sourceIndex: number, desIndex: number) => {
    const _list = Array.from(list);
    const [removed] = _list.splice(sourceIndex, 1);
    _list.splice(desIndex, 0, removed);
    return _list;
  };

  const reorderProjectOfWorkspace = (currentWorkspace: WorkspaceItem, sourceIndex: number, desIndex: number) => {
    return reorder(currentWorkspace?.projects || [], sourceIndex, desIndex);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.type === "blockList") {
      const _items = workspaces.map((it) => {
        const { projects, ...data } = it;
        return data;
      });
      mutationWorkspaceReorder.mutate({
        item: _items[result.source.index],
        items: _items,
        newRank: _items[result.destination.index].order,
      });
      const items = reorder(workspaces, result.source.index, result.destination.index);
      dispatch(setWorkspaces(items));
    } else {
      const workspaceIdContainDraggingProject = Number(result.draggableId.split("-")[0]);
      const currentWorkspace = workspaces.find((item) => item.id === workspaceIdContainDraggingProject);
      const projectsOfWorspace = currentWorkspace?.projects;
      if (projectsOfWorspace) {
        mutationProjectReorder.mutate({
          item: projectsOfWorspace[result.source.index],
          items: projectsOfWorspace,
          newRank: projectsOfWorspace[result.destination.index].order,
        });
        const items = reorderProjectOfWorkspace(currentWorkspace, result.source.index, result.destination.index);
        dispatch(setProjectOfWorkspace({ workspaceId: currentWorkspace.id, projects: items }));
      }
    }
  };

  const getMenuStyle = (isDragOver: boolean) => {
    return {
      backgroundColor: isDragOver ? "#f5f5f5" : "#fff",
      width: 250,
    };
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppableMenu" type="blockList">
          {(provider, snapshot) => {
            return (
              <div
                {...provider.droppableProps}
                ref={provider.innerRef}
                style={{
                  ...getMenuStyle(snapshot.isDraggingOver),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "baseline",
                }}
              >
                {workSpaceData.map((item, index) => {
                  return <DnDParentMenuItem item={item} index={index} />;
                })}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DnDMenu;
