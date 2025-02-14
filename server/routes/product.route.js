import express from "express";
import { UploadProductController } from "../controller/productConn/UploadProduct.controller.js";
import authToken from "../middleware/authToken.js";
import { getProductController } from "../controller/productConn/getProduct.js";
import { UpdateProduct } from "../controller/productConn/UpdateProduct.js";
import { getCategoryProduct } from "../controller/productConn/getCategoryProduct.js";
import { getCategoryWiseProduct } from "../controller/productConn/getCategoryWiseProduct.js";
import { getProductDetails } from "../controller/productConn/getProductDetails.js";

const routeProduct = express.Router();

routeProduct.post("/upload-product", authToken, UploadProductController);
routeProduct.get("/get-product", authToken, getProductController);
routeProduct.put("/update-product", authToken, UpdateProduct);
routeProduct.get("/get-category-product", getCategoryProduct);
routeProduct.post("/category-product" , getCategoryWiseProduct)
routeProduct.post("/single-product-details" , getProductDetails)
export default routeProduct;
