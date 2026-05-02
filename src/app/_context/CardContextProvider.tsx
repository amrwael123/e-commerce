"use client"

import React, { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'
import { getMyUserCart } from '../_actions/card.action'
import { CartItemType, CartResType } from '@/types/card.type'

export const cartContext = createContext( {} )

export default function CardContextProvider( {children , userCart} : {children : ReactNode , userCart : CartResType} ) {

    const [cartId, setCartId] = useState(userCart?.cartId || "")
    console.log("userCarttt" , userCart);
    console.log("cartId initialized as:", userCart?.cartId);
    

    const [numberOfCartItem, setnumberOfCartItem] = useState(userCart?.numOfCartItems || 0)
    // const [cartData, setCartData] = useState<> (userCart.data)
    const [totalPriceOfCart, settotalPriceOfCart] = useState(userCart?.data?.totalCartPrice ?? 0)

    const [CartProducts, setCartProducts] = useState<CartItemType []> (userCart?.data?.products ?? [])

  return (
    <cartContext.Provider value={ { cartId, setCartId,numberOfCartItem , setnumberOfCartItem  ,totalPriceOfCart ,settotalPriceOfCart ,CartProducts ,setCartProducts} }>
        {children}
    </cartContext.Provider>
  ) 
}
