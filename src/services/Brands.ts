// import { getMyToken } from "@/app/utils/getMyToken"

// export async function getAllBrand(){
//         const token = await getMyToken()
//         const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands" , {
//             headers : {
//                 token : token as string
//             }
//         })
//         const finalRes = await await res.json()
//         console.log( "brand res", finalRes.data);
//         return finalRes
//     }

import { getMyToken } from "@/app/utils/getMyToken";

export async function getAllBrand() {
    const token = await getMyToken();

    const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/brands",
        {
        headers: {
            token: token as string,
        },
        cache: "no-store",
        }
    );

    const finalRes = await res.json();

    return finalRes.data;
}