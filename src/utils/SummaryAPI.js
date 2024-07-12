const UserBackendDomin = "http://localhost:4000/api/v1/users/";

export const SummaryAPI = {
  signUP: {
    url: `${UserBackendDomin}sign-up`,
    method: "post",
  },
  signIn: {
    url: `${UserBackendDomin}/sign-in`,
    method: "post",
  },
  getCurrentUserdetails: {
    url: `${UserBackendDomin}/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${UserBackendDomin}/logout-user`,
    method: "DELETE",
  },
};
