import backend from "../utils/api";

export default {
  getUserById: (userId: number) => backend.get(`user/${userId}`),
  createUser: (user: object) => backend.post("user", user),
  getUserByEmail: (email: string) => backend.get(`user/email/${email}`),
};
