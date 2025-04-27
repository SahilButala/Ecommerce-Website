import SearchProducts from '../../controllers/shopControllers/SearchController.js'
import express from 'express'

const Search_Route = express.Router()

Search_Route.get('/:keyword',SearchProducts)


export default Search_Route