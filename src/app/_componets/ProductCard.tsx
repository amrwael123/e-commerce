import { ProductsType } from '@/types/Product.type'
import Link from 'next/link'
import React from 'react'
import { FaRegEye, FaRegHeart, FaStar } from 'react-icons/fa'
import AddToCardBtn from './AddToCardBtn'

interface ProductCardPropsType {
    product : ProductsType
}


export default function ProductCard( {product} :ProductCardPropsType) {
    return <>
    
    <div className='p-3 rounded-2xl border relative'>
    
        <div className='absolute top-4 right-1'>
            <div className=' bg-white border cursor-pointer shadow-2xl h-8 w-8 rounded-full flex items-center justify-center'><FaRegHeart/></div>
            <Link href={`/product/${product.id}`} className='mt-3 bg-white cursor-pointer border shadow-2xl h-8 w-8 rounded-full flex items-center justify-center'><FaRegEye/></Link>
        </div>
    
        <img src={product.imageCover} alt={product.title} />
        <p className='text-gray-600 text-xs mt-1.5'>{product.category.name}</p>
        <h3 className='text-lg font-semibold'>{product.title.split(" " , 2).join(" ")}</h3>
    
        <div className='flex items-center mt-1 gap-3'><FaStar className='text-yellow-400'/>{product.ratingsAverage}</div>
    
        <div className='flex justify-between items-center'>
            { product.priceAfterDiscount ? <div> <span className='text-green-600 text-xl font-semibold '> {product.priceAfterDiscount} EGP </span> <span className='text-gray-600 text-sm line-through'> {product.price} EGP </span> </div> :<h4 className=' text-xl font-semibold'> {product.price} EGP </h4> } 
            <AddToCardBtn productId={product.id}/>
        </div>
    
        </div>
    
    
    </>
}
