import express from "express";
import { UploadProductController } from "../controller/productConn/UploadProduct.controller.js";
import authToken from "../middleware/authToken.js";
import { getProductController } from "../controller/productConn/getProduct.js";

const routeProduct = express.Router();

routeProduct.post("/upload-product", authToken, UploadProductController);
routeProduct.get("/get-product", authToken, getProductController);
export default routeProduct;
