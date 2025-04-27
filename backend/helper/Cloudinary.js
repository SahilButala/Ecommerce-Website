import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()


cloudinary.config({
    cloud_name : 'dpomj4vk4' ,
    api_key : '635195142416827',
    api_secret : process.env.CLOUDINARY_API_SECRET 
})

const storage = new multer.memoryStorage()

const imageUploadhandlerUtil = async(file)=>{
    const res = await cloudinary.uploader.upload(file,{
        resource_type : 'auto'
    })
    return res
}

const upload = multer({storage})

export {upload,imageUploadhandlerUtil}