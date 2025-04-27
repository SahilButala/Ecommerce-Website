import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'


const Categories = ({categories,handleToNavigateProductsPage}) => {
  return (
    <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 mt-5'>
         {
            categories.map((category)=>(
                <div className='' key={category.id}>
                    <Card>
                        <CardContent className='flex flex-col items-center  p-7'>
                            <category.icon className='text-primary w-8 h-8' />
                            <Button 
                            onClick={()=>handleToNavigateProductsPage(category?.id,"category")}
                            variant='outline' className='font-medium mt-3'>{category.label}</Button>
                        </CardContent>
                    </Card>
                </div>
            ))
         }
    </div>
  )
}

export default Categories