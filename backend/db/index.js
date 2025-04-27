import mongoose from "mongoose"
const Db_Connection = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL).then(console.log("DB connected successfully"))
    } catch (error) {
        console.log(error)
    }
}

export default Db_Connection