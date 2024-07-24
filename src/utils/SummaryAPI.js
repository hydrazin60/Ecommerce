const UserBackendDomain = "http://localhost:4000/api/v1/users/";
const ProductBackendDomain = "http://localhost:4000/api/v1/product";

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
  uploadproduct: {
    url: `${ProductBackendDomain}/upload-product`,
    method: "post",
  },
  getallproduct: {
    url: `${ProductBackendDomain}/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${ProductBackendDomain}/update-product`,
    method: "put",
  },
  ProductCategory: {
    url: `${ProductBackendDomain}/get-category-product`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${ProductBackendDomain}/category-product`,
    method: "post",
  },
  singleProductDetails: {
    url: `${ProductBackendDomain}/single-product-details`,
    method: "post",
  },
  addtoCartProduct: {
    url: `${UserBackendDomain}/addtocart`,
    method: "post",
  },
  addtocartProductCount: {
    url: `${UserBackendDomain}/countAddToCartProduct`,
    method: "get",
  },
  addtocartProductview: {
    url: `${UserBackendDomain}/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${UserBackendDomain}/update-cart-product`,
    method: "post",
  },
  deletecartProduct: {
    url: `${UserBackendDomain}/delete-cart-product`,
    method: "post",
  },
};

//delete-cart-product
