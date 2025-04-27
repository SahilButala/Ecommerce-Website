import { Register , Login, logout,checkAuth} from "../../../controllers/auth/User_Controller.js";
import express from "express"
import { authMiddleWare } from "../../../middlewares/authMiddleware.js";


const UserRoute = express.Router()

// all routes
UserRoute.post('/register',Register)
UserRoute.post('/login',Login) 
UserRoute.post('/logout',logout) 





export default UserRoute