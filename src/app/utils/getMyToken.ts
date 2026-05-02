import { cookies } from 'next/headers';
import { decode } from "next-auth/jwt";

export async function getMyToken(){

    const MyCookies = await cookies()
    console.log("MyCookies",MyCookies);
    
    
    const tokenFromCookies = MyCookies.get("next-auth.session-token")?.value
    if(tokenFromCookies == null){
        return null
    }
    console.log("tokenFromCookies", tokenFromCookies);
    const myTokenAfterDecoded = await decode(
        {token : tokenFromCookies ,
            secret : process.env.NEXTAUTH_SECRET!})

    console.log("myTokenAfterDecoded" ,myTokenAfterDecoded?.realTokenFromBackend);
    
    return myTokenAfterDecoded?.realTokenFromBackend
}

