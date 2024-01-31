import {Router} from "express";
import Product_controller from "./Product_controller.js";
import TokenService from "../user/auth.js";
import upload from "./formdata.js";
import Product_database from "./Product_database.js";

const Product_router = new Router()

// Product_router.get('/getone', Product_controller.getone);
// Product_router.get('/get', Product_controller.get)
Product_router.post('/create', TokenService.verifyToken, Product_controller.create);
Product_router.post('/upload_photo', TokenService.verifyToken, upload.any(), Product_controller.uploadImage)
Product_router.get('/get_photo', Product_controller.getimage)
Product_router.get('/', Product_controller.searchProducts)


export default Product_router