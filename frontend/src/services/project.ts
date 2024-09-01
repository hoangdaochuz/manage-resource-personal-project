import backend from "../utils/api";

export default {
  getAllProject: () => backend.get("project"),
  createProject: (data: object) => backend.post("project", data),
  updateProject: (id: number, data: object) => backend.patch(`project/${id}`, data),
  deleteProject: (id: number) => backend.delete(`project/${id}`),
  reorderProject: (data: object) => backend.post("project/reorder", data),
};
