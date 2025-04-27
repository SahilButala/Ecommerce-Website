
import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const UserHeader = lazy(()=>import('../../components/user_view/header'))
const Footer = lazy(()=>import('../../pages/user_view/Footer'))
const UserLayOutPage = () => {
  return (
    <div className='flex flex-col overflow-hidden'> 
        <UserHeader/>
        <main className='flex flex-col w-full '>
                 <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default UserLayOutPage