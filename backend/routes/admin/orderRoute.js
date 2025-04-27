import express from 'express'
import {getallOrderByUser,AdmingetallOrderDetails, updateTheOrderStatus} from '../../controllers/admin/orderController.js'



const AdminOrderRoute = express.Router()

AdminOrderRoute.get('/get',getallOrderByUser)
AdminOrderRoute.get('/get/details/:id',AdmingetallOrderDetails)
AdminOrderRoute.post('/update/:id',updateTheOrderStatus)



export default AdminOrderRoute