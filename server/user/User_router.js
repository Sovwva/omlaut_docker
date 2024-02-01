import {Router} from "express";
import User_controller from './User_controller.js'
import TokenService from "../auth/auth.js";

const User_router = new Router()

User_router.get('/getuser', User_controller.get);
User_router.get('/get', TokenService.verifyToken, User_controller.get_via_token);
User_router.post('/create', User_controller.create);
User_router.post('/login', User_controller.login);
User_router.put('/login', TokenService.verifyToken, User_controller.ChangePassword);
User_router.delete('/delete', TokenService.verifyToken, User_controller.delete);

export default User_router;