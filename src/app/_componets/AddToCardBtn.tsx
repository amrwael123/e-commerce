"use client"
import React, { useContext } from 'react'
import { addProductToCard } from '../_actions/card.action'
import { toast } from 'sonner'
import { cartContext } from '../_context/CardContextProvider'

export default function AddToCardBtn( {productId} : {productId : string} ) {

    const {setnumberOfCartItem ,settotalPriceOfCart ,setCartProducts} = useContext(cartContext)

    async function handelAddToCard(){
        const res = await addProductToCard(productId)
        console.log ( res );
        
        if(res.status == "success"){
            toast.success(res.message , {position : "top-center"})
            setnumberOfCartItem(res.numOfCartItems)
            settotalPriceOfCart(res.data.totalCartPrice)
            setCartProducts(res.data.products)
        }
    }
    
    
    return (
        <button onClick={handelAddToCard} className='bg-emerald-500 cursor-pointer text-white rounded-full w-10 h-10 text-2xl mt-2 '>+</button>

    )
}
