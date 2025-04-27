import express from 'express'
import { addFeatureImage, getFeatureImages } from '../../controllers/shopControllers/Feature_Controller.js'

const Feature_Route = express.Router()

Feature_Route.post('/add',addFeatureImage)
Feature_Route.get('/get',getFeatureImages)

export default Feature_Route