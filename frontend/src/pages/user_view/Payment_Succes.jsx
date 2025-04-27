import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentSucces = () => {

  const navigate = useNavigate()
  return (
    <div className='mt-[82px] relative'>
        
        <div className='text-center mt-28 capitalize font-semibold text-blue-400'>
          Thank you to Purchase our Product <br/>
          <span className='text-sm underline cursor-pointer'
           onClick={()=>navigate('/shop/home')}
          >enjoy your shopping</span>
            
        </div>
    </div>
  )
}

export default PaymentSucces