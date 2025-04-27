import Product from '../../models/Product.model.js'

const SearchProducts = async (req,res)=>{
   try {
        const {keyword} = req.params;
        if(!keyword || typeof keyword !== "string" ){
             return res.status(400).json({
                  message : "keyword is requried and must in string"
             })
        }

        const regx = new RegExp(keyword , "i")

        const createSearchQuery  = {
            $or : [
                {title : regx},
                {description : regx},
                {brand : regx},
                {category : regx},
            ]
        }

        const searchResults = await Product.find(createSearchQuery)

        res.status(200).json({
            success : true,
            data : searchResults
        })
   } catch (error) {
       res.status(500).json({
          success : false,
          message : error.message || "Something went wrong"
       })
   }
}

export default SearchProducts