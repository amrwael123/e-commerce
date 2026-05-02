import { getAllCategories } from '@/services/Categories'
import Link from 'next/link'
import React from 'react'

export default async function ShopByCategory() {

    const Categories = await getAllCategories()

    return <div className='w-10/12 mx-auto'>

        <div className='flex justify-between my-3.5 items-center'>
            <h2 className='text-3xl font-bold'>Shop By  <span className='text-green-600 font-bold'>Category</span> </h2>
            <Link className='text-emerald-600  font-bold'  href={"/Categories"}> view all Categories</Link>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-6 gap-6'>

            {Categories.map(item =>  <div key={item.id} className='shadow-2xl    border rounded-2xl p-5'>
                <img className='h-20 w-20 rounded-full m-auto' src={item.image} alt={item.name} />
                <h3 className='text-center text-lg'> {item.name} </h3>
            </div> )}

        </div>
    
    </div>
}
