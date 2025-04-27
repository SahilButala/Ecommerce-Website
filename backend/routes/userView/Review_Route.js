import express from 'express'
import { addReviewToProduct, getAllReviews } from '../../controllers/shopControllers/Review_Controller.js'


const Review_Route = express.Router()

Review_Route.post('/add',addReviewToProduct)
Review_Route.get('/get/:productId',getAllReviews)


export default Review_Route