
import * as zod from "zod"

    export const formSchemaLogin = zod.object( {

    email : zod.email("enter your email"),
    password : zod.string("enter your password").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),

    } )


    export type LogInDataType = zod.infer<typeof formSchemaLogin> 