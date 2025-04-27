import { Button } from '@/components/ui/button'
import { Star, StarIcon } from 'lucide-react'
import React from 'react'

const StarRating = ({rating,handlRatingChange}) => {
  return (
  <div className='flex gap-1'>
     {  [1,2,3,4,5].map((item,i)=>(
        <Button
        onClick={handlRatingChange ? ()=> handlRatingChange(item) : null}
         key={i}
        variant='outline'  size={'icon'} className={`flex  w-6  h-6  rounded-full p-3 transition-colors ${item <= rating ? 'text-yellow-400 hover:bg-black' : "text-black hover:bg-primary hover:text-white"} `}>
                <StarIcon
                 className={` ${item <=rating ? "fill-yellow-400" : "fill-gray-200 "}`}
                 
                />
        </Button> 
    ))}
  </div>
  )
}

export default StarRating