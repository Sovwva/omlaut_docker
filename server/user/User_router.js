import {Router} from "express";
import User_controller from './User_controller.js'

const User_router = new Router()

User_router.get('/getuser/:login', User_controller.get);
User_router.post('/create', User_controller.create);

export default User_router;