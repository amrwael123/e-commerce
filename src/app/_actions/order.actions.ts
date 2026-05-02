"use server"

import { shippingAddressType } from "@/types/order.types";
import { getMyToken } from "../utils/getMyToken";

export async function createCashOrder(cartId : string , shippingAddress : shippingAddressType){
    const token = await getMyToken()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,{
        headers : {
            token : token  as string, 
            "Content-Type" : "application/json",
        },
        method : "POST",
        body : JSON.stringify(shippingAddress)
    })
    const FinalRes = await res.json()
    return FinalRes
}

export async function createVisaOrder(cartId : string , shippingAddress : shippingAddressType){
    const token = await getMyToken()
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
            headers : {
                token : token  as string,
                "Content-Type" : "application/json",
            },
            method : "POST",
            body : JSON.stringify(shippingAddress)
        })
        const FinalRes = await res.json()
        console.log("Visa order response:", FinalRes)

        if(!res.ok) {
            console.error("Visa order API error:", FinalRes)
        }
        return FinalRes
    } catch(error) {
        console.error("Error creating visa order:", error)
        return { status: "fail", message: "Error creating payment session" }
    }
}