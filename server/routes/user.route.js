import express from "express";
import { SignUpController } from "../controller/SignUp.controller.js";
import { SignIn } from "../controller/Signin.control.js";
import { UserDetailsController } from "../controller/Userdetails.controller.js";
import authToken from "../middleware/authToken.js";
import { userLogout } from "../controller/LogoutUser.controller.js";
import { AlluserList } from "../controller/AllUserList.controller.js";
import { updateUser } from "../controller/UpdateUserByADMAIN.js";
import { addToCartController } from "../controller/cart/addToCart. controller.js";
import { countAddtoCartProduct } from "../controller/cart/countAddtoCartProduct.js";
import { addToCartViewProduct } from "../controller/cart/addtoCartViewProduct.js";
import { updateAddToCartProduct } from "../controller/cart/UpdateCartProduct.js";
import { deleteAddToCartProduct } from "../controller/cart/DeleteAddToCartProduct.js";

const router = express.Router();

router.post("/sign-up", SignUpController);
router.post("/sign-in", SignIn);
router.get(`/user-details`, authToken, UserDetailsController);
router.delete(`/logout-user`, authToken, userLogout);
router.get("/all-user-list", authToken, AlluserList);
router.put("/update-user", authToken, updateUser);
//
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddtoCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product" , authToken , deleteAddToCartProduct)
export default router;
