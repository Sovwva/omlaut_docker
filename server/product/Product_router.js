import {Router} from "express";
import Product_controller from "./Product_controller.js";
import TokenService from "../user/auth.js";

const Product_router = new Router()

Product_router.get('/getone', Product_controller.getone);
Product_router.get('/get', Product_controller.get)
Product_router.create('/create', TokenService.verifyToken, Product_controller.create);


export default Product_router