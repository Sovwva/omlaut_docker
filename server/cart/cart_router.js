import {Router} from "express";
import TokenService from "../auth/auth.js";
import Cart_controller from "./Cart_controller.js";

const Cart_router = new Router()

Cart_router.get('/', TokenService.verifyToken, Cart_controller.get_user_cart)
Cart_router.post('/', TokenService.verifyToken, Cart_controller.add_product_to_card)
Cart_router.delete('/', TokenService.verifyToken, Cart_controller.delete_product_from_cart)
Cart_router.delete('/delete_all', TokenService.verifyToken, Cart_controller.delete_all_product_from_cart)


export default Cart_router