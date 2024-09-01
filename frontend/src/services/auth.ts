import backend from "../utils/api";

export default {
  signup: (data: object) => backend.post("auth/signup", data),
  signin: (data: object) => backend.post("auth/signin", data),
  logout: () => backend.get("auth/logout"),
  refreshToken: () => backend.get("auth/refresh"),
  confirmEmail: (token: string) => backend.post("email/confirm", { token }),
  loginWithGoogle: () => backend.get("auth"),
  loginGoogleRedirect: (code: string) => backend.get(`auth/google-redirect?code=${code}`),
  resetPasswordRequest: (email: string) => backend.post("auth/reset-password-request", { email }),
  resetPassword: (email: string, token: string, newPassword: string) =>
    backend.post("auth/reset-password", { email, token, newPassword }),
};
