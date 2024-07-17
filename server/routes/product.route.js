import express from "express";
import { UploadProductController } from "../controller/productConn/UploadProduct.controller.js";
import authToken from "../middleware/authToken.js";

const routeProduct = express.Router();

routeProduct.post("/upload-product" , UploadProductController);

export default routeProduct;
