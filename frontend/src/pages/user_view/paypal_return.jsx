import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { clearCart } from '@/store/userView/cart'
import { CaptureOrder, resetorderAndApprovalUrl } from '@/store/userView/orderSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const PaypalReturnPage = () => {

  const dispatch =  useDispatch()
  const location =useLocation()
  const params = new URLSearchParams(location.search)

  const paymentId = params.get('paymentId')
  const payerId = params.get('PayerID')

  console.log(payerId,paymentId)

  useEffect(() => {
    if (paymentId && payerId) {
      const storedOrder = sessionStorage.getItem("currentOrderId");
      const orderId = storedOrder ? JSON.parse(storedOrder) : null;

      if (orderId) {
        dispatch(CaptureOrder({ paymentId, payerId, orderId })).then((data) => {
          if (data?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
            dispatch(resetorderAndApprovalUrl());
            dispatch(clearCart())
            window.location.href = '/shop/payment-success';
          }
        });
      }
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div className='text-center  w-full mt-[82px]'>
        <Card className='flex justify-center items-center'>  
          <CardHeader>
            <CardTitle className='text-xl'>Processing Payment ... Please wait </CardTitle>
          </CardHeader>
        </Card>
        
    </div>
  )
}

export default PaypalReturnPage