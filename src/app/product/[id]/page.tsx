import { getIdProduct } from '@/services/Products'
import { ProductsType } from '@/types/Product.type';
import React from 'react'
import { FaStar } from 'react-icons/fa';
import { RiShareFill } from 'react-icons/ri';

export default async function page({params} : ProductsType){

    console.log(params)
    const myParams = await params
    console.log( "myParams", myParams);
    const product = await getIdProduct(myParams.id)



    return <>

    <div className='h-screen  bg-gray-100 grid grid-cols-4 items-center gap-4 w-10/12 mx-auto'>

        <div className='col-span-1'>
            <img className='w-full' src={product?.imageCover} alt={product?.title} />
        </div>

        <div className='col-span-3'>

            <div className=' gap-3 flex items-center'>
                <span className='text-sm rounded-2xl border bg-gray-200 text-green-600 p-0.5'>{product?.category.name}</span> 
                <span className='text-sm rounded-2xl border bg-gray-200 p-0.5 font'>{product?.brand.name} </span>
            </div>

            <h1 className='font-semibold text-4xl my-7'> {product?.title}</h1>
            <div className='flex items-center gap-2 text-yellow-400'>
            <FaStar/>{product?.ratingsAverage}
            </div>
            <p> {product?.description} </p>

            <div className='flex items-center gap-3 my-2.5'>
                <button className='bg-emerald-600 text-white w-1/2 rounded-2xl py-3 px-6 cursor-pointer'>Add to Crad</button>
                <button className='bg-gray-950 text-white w-1/2 rounded-2xl py-3 px-6 cursor-pointer'>Buy Now</button>
            </div> 
            <div className='flex items-center gap-2 '>
            <button className='w-10/12 rounded-2xl border my-1.5 py-2 px-6 cursor-pointer'>Add to WishList</button>
            <div className='border py-2.5  px-3 rounded cursor-pointer'>
            <RiShareFill />
            </div>
            </div>
        </div>


    </div>
    

    </>
}
