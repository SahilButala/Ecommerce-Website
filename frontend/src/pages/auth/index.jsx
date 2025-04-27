import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayoutPage = () => {
  return (
    <div className='flex h-screen w-full'>
          <div className='hidden lg:flex  items-center justify-center w-1/2 bg-black'>
                    <img src="https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?q=80&w=3368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""  className='object-cover h-full w-full'/>
          </div>
          <div className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
            <Outlet/>
          </div>
    </div>
  )
}

export default AuthLayoutPage