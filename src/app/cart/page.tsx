
"use client"
import React, { useContext } from 'react'
import image1 from '@/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png'
import { cartContext } from '../_context/CardContextProvider'
import { CartItemType } from '@/types/card.type'
import { deleteAllItemFromCart, deleteItemFromCart, updateQuantityCart } from '../_actions/card.action'
import { toast } from 'sonner'
import { success } from 'zod'
import Link from 'next/link'

export default function CartPage() {

  const { CartProducts ,totalPriceOfCart ,numberOfCartItem , setnumberOfCartItem ,settotalPriceOfCart ,setCartProducts} = useContext(cartContext)

  async function handelDeleteItem( id : string){
    const res  = await deleteItemFromCart(id)
    // console.log(res);
    setCartProducts(res.data.products)
    setnumberOfCartItem(res.numOfCartItems)
    settotalPriceOfCart(res.data.totalCartPrice)
    toast.success(res.message , {position : "top-center"})
    
  }

  async function handelQuantityCart(id : string , count :number ){
    const res = await updateQuantityCart(id , count)
    console.log(res);
    if(res.status == "success"){
      setCartProducts(res.data.products)
      setnumberOfCartItem(res.numOfCartItems)
      settotalPriceOfCart(res.data.totalCartPrice)
      toast.success(res.message , {position : "top-center"})
    }else{
      toast.error(res.message)
    }

    
  }

  async function handelDeleteAllCart(){
    const res = await deleteAllItemFromCart()
    console.log(res);
      if (res.status == "success") {
        setCartProducts([]);
        setnumberOfCartItem(0);
        settotalPriceOfCart(0);
      }else{
        toast.error(res.message)
      }
    
  }

  return <>


    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-4">
          {/* PRODUCT CARD */}
          {CartProducts.map((item : CartItemType)=><div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded"
              />

              <div>
                <h2 className="font-medium">{item.product.title}</h2>
                <p className="text-sm text-gray-500 my-2">{item.product.brand.name}</p>
                <p className="text-sm text-gray-400">{item.product.category.name}</p>

                {/* QUANTITY */}
                <div className="flex items-center mt-2 border rounded w-fit">
                  <button onClick={ ()=> handelQuantityCart(item.product.id , item.count - 1)} className="px-3 py-1 cursor-pointer">-</button>
                  <span className="px-3">{item.count}</span>
                  <button onClick={ ()=> handelQuantityCart(item.product.id , item.count + 1)} className="px-3 py-1 cursor-pointer">+</button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-green-600 font-semibold">${item.price}</p>
              <button onClick={ ()=> handelDeleteItem(item.product.id) }
               type='button'
                className="text-red-500 bg-gray-100 p-1.5 rounded-2xl text-sm mt-2 cursor-pointer ">
                  Remove
                  </button>
            </div>
          </div> )}
          {/* ACTIONS */}
          <div className="flex justify-between items-center">
            <button className="text-blue-500 text-sm">← Continue Shopping</button>

            <button onClick={handelDeleteAllCart} className="border border-red-400 text-red-500 px-4 py-2 rounded-lg">
              Clear Cart
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Total Items</span>
            <span>{numberOfCartItem}</span>
          </div>

          <div className="flex justify-between font-semibold mb-6">
            <span>Total Price</span>
            <span className="text-blue-600">${totalPriceOfCart}</span>
          </div>

          <Link href="/payment">
            <button className="w-full   bg-gradient-to-r  cursor-pointer from-indigo-500 to-purple-500 text-white py-3 rounded-lg">
            Checkout
            </button>
          </Link>

          <p className="text-xs text-gray-400 text-center mt-3">
            Taxes and shipping calculated at checkout
          </p>
        </div>
      </div>
    </div>
 



  </>
  
}
