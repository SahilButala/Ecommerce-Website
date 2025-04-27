import express from 'express'
import { add_Address, delete_Address, fetchall_Address, update_Address } from '../../controllers/shopControllers/Address_Controller.js'

const Address_Route = express.Router()

// routes
Address_Route.get('/get/:userId',fetchall_Address)
Address_Route.post('/add',add_Address)
Address_Route.delete('/delete/:userId/:addressId',delete_Address)
Address_Route.put('/update/:userId/:addressId',update_Address)

export default Address_Route