import product from "@/app/product/[id]/page";
import { ProductsType } from "@/types/Product.type";

export async function   getAllProduct() : Promise <ProductsType[] | null>{
    

    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
            cache : "force-cache" ,
            // next : ""
        } )
        const finalRes = await res.json()
        console.log(finalRes.data);
        return finalRes.data  
    } catch (error) {
        return null
    }
    }


    

    export async function getIdProduct ( id : string) : Promise < ProductsType | null>{

        try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        const finalRes = await res.json()
        console.log(finalRes.data);
        return finalRes.data  
    } catch (error) {
        return null
    }

    }