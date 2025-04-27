import express from 'express'
import dotenv from 'dotenv'
import Db_Connection from './db/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import UserRoute from './routes/userView/auth/User_route.js'
import admimRouter from './routes/admin/admin_route.js'
import User_View from './routes/userView/User_View.js'
import CartRouter from './routes/userView/cart/Cart_Route.js'
import Address_Route from './routes/userView/Address_Route.js'
import Order_Route from './routes/userView/Order_Route.js'
import AdminOrderRoute from './routes/admin/orderRoute.js'
import Search_Route from './routes/userView/Search_Route.js'
import Review_Route from './routes/userView/Review_Route.js'
import Feature_Route from './routes/userView/Feature_Route.js'


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

// db connection  
Db_Connection()

// middlewares
app.use(cookieParser())
app.use(express.json()) 
app.use(cors({
       origin : process.env.CLIENT_URL,
       methods : ['GET','POST','DELETE','PUT'],
       allowedHeaders : [
        'Content-Type' ,
        'Authorization',
        'Catche-Control',
        'Expires',
        'Pragma'
       ],
       credentials : true
}))

// routes
app.use('/user/auth',UserRoute)
app.use('/admin',admimRouter)
app.use('/userview',User_View)
app.use('/userview/cart',CartRouter)
app.use('/checkout/user',Address_Route)
app.use('/paypal/user',Order_Route)
app.use('/search',Search_Route)
app.use('/user/review',Review_Route)
// admin
app.use('/admin/orders',AdminOrderRoute)
app.use('/admin/feature',Feature_Route)

app.get('/',(req,res)=>{
      res.send("hello server is ready")
})
app.listen(PORT,()=>{

    console.log(`server running at ${PORT}`)
})