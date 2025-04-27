import express from 'express'
import { addToCart, fetchAllCartItems, RemoveToCart, updateCartItemQuantity } from '../../../controllers/shopControllers/Cart_Controller.js'

const CartRouter = express.Router()


// Cart routes
CartRouter.post('/add',addToCart)
CartRouter.get('/get/:userId',fetchAllCartItems)
CartRouter.put('/update',updateCartItemQuantity)
CartRouter.delete('/delete/:userId/:productId',RemoveToCart)



export default CartRouter