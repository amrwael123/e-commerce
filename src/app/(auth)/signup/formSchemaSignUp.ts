
import * as zod from "zod"

    export const formSchemaSignUp = zod.object( {

    name : zod.string("enter your name"),
    email : zod.email("enter your email"),
    password : zod.string("enter your password").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    rePassword : zod.string("enter your rePassword").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    phone : zod.string("enter your phone")

    } ).refine( function(params){
    return params.password === params.rePassword
    },
    {
    message : "password and rePassword not matched",
    path : [ "rePassword" ]
    } )


    export type SignUpDataType = zod.infer <typeof formSchemaSignUp> 