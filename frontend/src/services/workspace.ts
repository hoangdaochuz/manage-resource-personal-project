import backend from "../utils/api";

export default {
  addWorkspace: (data: object) => backend.post("workspace", data),
  getWorkspacePaginated: (data: object) => backend.post("workspace/search", data),
  updateWorkspace: (id: number, data: object) => backend.patch(`workspace/${id}`, data),
  deleteWorkspace: (id: number) => backend.delete(`workspace/${id}`),
  getMyWorkspace: (userId: number, siteId: number) => backend.get(`workspace/owner/${userId}/site/${siteId}`),
  reorderWorkspace: (data: object) => backend.post("workspace/reorder", data),
};
