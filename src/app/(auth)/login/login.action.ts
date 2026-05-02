"use server"
import { cookies } from "next/headers";
import { LogInDataType } from "./schema.login";

    export async function LogInAction(values : LogInDataType){

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",{
            body : JSON.stringify(values),
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            }
            })
            const FinalRes = await res.json()
            console.log( "FinalRes", FinalRes );
            
            const myCookies = cookies()
            ;(await myCookies).set("token" ,FinalRes.token ,{
                httpOnly :  true,
                expires : 60 * 60 * 24 ,
                secure : true ,
                sameSite : "strict" 
            } )
            // ;(await myCookies).get(FinalRes.token)
            
            return res.ok

}

