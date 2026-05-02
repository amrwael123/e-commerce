import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const nextAuthConfig  : NextAuthOptions = {

    providers : [
        Credentials({

            // name : "fresh card",
            credentials : {
                email : {placeholder : "Enter your Email"},
                password : { },

            },
            async authorize(credentials){

                const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",{
                body : JSON.stringify(credentials),
                method : "POST",
                headers : {
                        "Content-Type" : "application/json"
                        }
                        })

                const FinalRes = await res.json()
                console.log( "FinalRes", FinalRes );

                if(FinalRes.message === "success" ){
                    return{
                        name : FinalRes.user.name,
                        email : FinalRes.user.email,
                        realTokenFromBackend : FinalRes.token
                    }
                }
                    return null
            }
        } )
    ],

    callbacks : {
        // login (auztrization) , nav , refresh
        jwt(params) {
            
            if(params.user){
                params.token.realTokenFromBackend = params.user?.realTokenFromBackend
            }

            console.log( "params" , params );
            
            return params.token
        },
        session(params){
            console.log("params from session" , params);
            return params.session
        },
    },
    session : {
        maxAge : 60 * 60 * 1
    },

    pages : {
        signIn : "/login"
    },
    secret : process.env.BETTER_AUTH_SECRET

}