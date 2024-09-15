import backend from "../utils/api";

export default {
  signSiteForUser: (data: object) => backend.post("site", data),
};
