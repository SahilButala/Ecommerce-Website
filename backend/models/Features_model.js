import mongoose from "mongoose";


const Feature_Model = new mongoose.Schema({
      image : {
        type : String
      }
})

const Feature_Schema = mongoose.model.Feature || mongoose.model("Feature",Feature_Model)

export default Feature_Schema