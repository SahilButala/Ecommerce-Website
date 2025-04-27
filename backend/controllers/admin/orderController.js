import Order_Schema from "../../models/Order.Model.js";



const getallOrderByUser = async (req,res)=>{
    try {
  
      const orders = await Order_Schema.find({});
  
      if (!orders.length) {
        return res.status(404).json({
          success: false,
          message: "No orders found!",
        });
      }
  
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  }

  const AdmingetallOrderDetails = async (req,res)=>{
     try {
      
        const {id} = req.params
        const order = await Order_Schema.findById(id)
  
  
        if(!order){
            return res.status(400).json({
                success : false,
                message : "No order found"
            })
        }
  
        res.status(200).json({
           success : true,
           data : order
        })
     } catch (error) {
        console.log("Error",error.message)
        res.status(500).json({
           success : false,
           message :error.message
        })
     }
  }

  const updateTheOrderStatus = async (req,res)=>{
      try {
        const { id } = req.params;
        const { orderStatus } = req.body;
    
        const order = await Order_Schema.findById(id);
    
        if (!order) {
          return res.status(404).json({
            success: false,
            message: "Order not found!",
          });
        }
    
        await Order_Schema.findByIdAndUpdate(id, { orderStatus });
    
        res.status(200).json({
          success: true,
          message: "Order status is updated successfully!",
        });
      } catch (error) {
        console.log("Error",error.message)
        res.status(500).json({
           success : false,
           message :error.message
        })
      }
  }

  export  {getallOrderByUser,AdmingetallOrderDetails , updateTheOrderStatus}