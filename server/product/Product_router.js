import {Router} from "express";
import Product_controller from "./Product_controller.js";
import TokenService from "../user/auth.js";
import upload from "./formdata.js";

const Product_router = new Router()

// Product_router.get('/getone', Product_controller.getone);
// Product_router.get('/get', Product_controller.get)
Product_router.post('/create', TokenService.verifyToken, Product_controller.create);
Product_router.post('/upload_photo', TokenService.verifyToken, upload.any(), Product_controller.uploadImage)


export default Product_router