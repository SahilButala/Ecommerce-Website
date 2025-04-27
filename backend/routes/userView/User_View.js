import { getProductDetailsById , getFiterProducts} from "../../controllers/shopControllers/product_Controller.js";
import express from 'express'


const User_View = express.Router()


User_View.get('/get/product/details/:id',getProductDetailsById)
User_View.get('/get/products',getFiterProducts)

export default User_View