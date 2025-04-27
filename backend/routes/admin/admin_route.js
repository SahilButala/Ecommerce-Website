
import express from 'express'
import { upload } from '../../helper/Cloudinary.js'
import {handleImageUploader,addNewProduct, getAllProducts, updateExsisteingProduct, DeleteProduct} from '../../controllers/admin/Products_Controller.js'


const admimRouter = express() 


// all routes  
admimRouter.post('/image-upload',upload.single('image'),handleImageUploader)
admimRouter.post('/add-product',addNewProduct)
admimRouter.get('/get-products',getAllProducts)
admimRouter.put('/edit-product/:id',updateExsisteingProduct)
admimRouter.delete('/delete-product/:id',DeleteProduct)



export default admimRouter