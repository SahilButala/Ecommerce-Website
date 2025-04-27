import { filterOptions } from '@/config/form'
import React from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'

const   FilterProductsList = ({handleFilter,filter}) => {
  return (
    <div className=''>
        <div className='border-b pb-4'>
            <h2 className='font-semibold text-2xl '>Filters</h2>
        </div>
        <div className='space-y-2 capitalize mt-3'>
            {
                Object.keys(filterOptions).map((item,i)=>(
                    
                    <div className='border-b pb-4' key={i}>
                        <h3 className='font-medium'>{item}</h3>
                        {
                            filterOptions[item].map((option,i)=>(
                                <Label  key={i}  className='flex mt-4 gap-2  items-center'>
                                    <Checkbox 
                                    checked={
                                                  filter && Object.keys(filter).length > 0 && filter[item] && filter[item].indexOf(option.id) > -1
                                    }
                                    
                                    onCheckedChange={()=>handleFilter(item,option.id)} />{option.label}
                                </Label>
                            ))
                        }
                   
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default FilterProductsList