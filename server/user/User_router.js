import {Router} from "express";
import User_controller from './User_controller.js'

const User_router = new Router()

User_router.get('/getuser', User_controller.get);
User_router.post('/create', User_controller.create);
User_router.post('/login', User_controller.login);
User_router.put('/login', User_controller.ChangePassword)

export default User_router;