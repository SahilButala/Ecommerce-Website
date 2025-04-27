import express from 'express'
import { capturePayment, CreateOrder , getallOrderByUser,getallOrderDetails} from '../../controllers/shopControllers/Order_Controller.js'

const Order_Route = express.Router()

Order_Route.post('/create',CreateOrder),
Order_Route.post('/capture',capturePayment)
Order_Route.get('/get/:userId',getallOrderByUser)
Order_Route.get('/get/details/:id',getallOrderDetails)

export default Order_Route 