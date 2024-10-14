import backend from "../utils/api";

export default {
  signSiteForUser: (data: object) => backend.post("site", data),
  getSiteOfUserBySiteId: (id: number, userId: number) => backend.get(`site/id/${id}?ownerId=${userId}`),
  getSitesOfUser: (userId: number) => backend.get(`site/owner/${userId}`),
};
