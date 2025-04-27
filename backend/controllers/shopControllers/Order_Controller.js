import Order_Schema from "../../models/Order.Model.js";
import paypal from "../../helper/paypal.js";
import CartModel from "../../models/Cart.model.js";
import Product from '../../models/Product.model.js'
// const CreateOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       cartItems,
//       addressInfo,
//       orderStatus,
//       paymentMethod,
//       paymentStatus,
//       totalAmount,
//       orderDate,
//       orderUpdateDate,
//       paymentId,
//       payerId,
//     } = req.body;

//     const create_payment_json = {
//       intent: "sale",
//       payer: {
//         payment_method: "paypal",
//       },
//       redirect_urls: {
//         return_url: `${process.env.CLIENT_URL}/paypal-return`,
//         cancel_url: `${process.env.CLIENT_URL}/paypal-cancel`,
//       },
//       transactions: [
//         {
//           item_list: {
//             items: cartItems.map((item) => ({
//               name: item.title,
//               sku: item.productId,
//               price: item.price.toFixed(2),
//               currency: "USD",
//               quantity: item.quantity,
//             })),
//           },
//           amount: {
//             currency: "USD",
//             total: totalAmount.toFixed(2),
//           },
//           description: "description",
//         },
//       ],
//     };
//     paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
//       if (error) {
//         console.log(error);

//         return res.status(500).json({
//           success: false,
//           message: "Error while creating paypal payment",
//         });
//       } else {
//         const newlyCreatedOrder = new Order_Schema({
//           userId,
//           cartItems,
//           addressInfo,
//           orderStatus,
//           paymentMethod,
//           paymentStatus,
//           totalAmount,
//           orderDate,
//           orderUpdateDate,
//           paymentId,
//           payerId,
//         });

//         await newlyCreatedOrder.save();

//         const approvalURL = paymentInfo.links.find(
//           (link) => link.rel === "approval_url"
//         ).href;

//         res.status(201).json({
//           success: true,
//           approvalURL,
//           orderId: newlyCreatedOrder._id,
//         });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const CreateOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    // Calculate totalAmount based on cartItems
    const totalAmount = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity; // Sum up price * quantity
    }, 0);

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_URL}/paypal-return`,
        cancel_url: `${process.env.CLIENT_URL}/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.error("Error ", error.response);
        return res.status(500).json({
          success: false,
          message: "Error while creating PayPal payment",
          errorDetails: error.response || error,
        });
      } else {
        const newlyCreatedOrder = new Order_Schema({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    const order = await Order_Schema.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cant found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;


  for(let item  of order.cartItems){
     let product = await Product.findById(item.productId)

     if(!product){
        return res.status(400).json({
              success : false,
              message : `Not enough stock this product  ${product.titile}`
        })
     }

     product.totalStock -= item.quantity

     await product.save()
  }






    const getCartId = order.cartId;
    await CartModel.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed ",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getallOrderByUser = async (req,res)=>{
  try {
    const { userId } = req.params;

    const orders = await Order_Schema.find({ userId });

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
const getallOrderDetails = async (req,res)=>{
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
      res.staus(500).json({
         success : false,
         message :error.message
      })
   }
}

export { CreateOrder, capturePayment , getallOrderByUser,getallOrderDetails};
