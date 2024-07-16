const UserBackendDomain = "http://localhost:4000/api/v1/users/";

export const SummaryAPI = {
  signUP: {
    url: `${UserBackendDomain}sign-up`,
    method: "post",
  },
  signIn: {
    url: `${UserBackendDomain}/sign-in`,
    method: "post",
  },
  getCurrentUserdetails: {
    url: `${UserBackendDomain}/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${UserBackendDomain}/logout-user`,
    method: "DELETE",
  },
  allUserList: {
    url: `${UserBackendDomain}/all-user-list`,
    method: "get",
  },
  updateUser: {
    url: `${UserBackendDomain}/update-user`,
    method: "put",
  },
};

// const UserBackendDomin = "http://localhost:4000/api/v1/users/";

// export const SummaryAPI = {
//   signUP: {
//     url: `${UserBackendDomin}sign-up`,
//     method: "post",
//   },
//   signIn: {
//     url: `${UserBackendDomin}/sign-in`,
//     method: "post",
//   },
//   getCurrentUserdetails: {
//     url: `${UserBackendDomin}/user-details`,
//     method: "get",
//   },
//   logout_user: {
//     url: `${UserBackendDomin}/logout-user`,
//     method: "DELETE",
//   },
//   allUserList: {
//     url: `${UserBackendDomin}/all-user-list`,
//     method: "get",
//   },
//   updateUser: {
//     url: `${UserBackendDomin}/update-user`,
//     method: "post",
//   },
// };
