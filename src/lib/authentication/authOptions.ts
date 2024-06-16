import { NextAuthConfig } from "next-auth";



import Google from "next-auth/providers/google"

export const authOptions : NextAuthConfig = { 
    providers : [ 
        Google({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
            authorization :{
                params : {
                    access_type : "offline",
                    prompt : "consent",
                }
            },
        })
    ],
    pages:{
        signIn : "/sign-in",
        signOut : "/sign-out",
        error : "/auth-error",
    },
    session : {
        strategy : "jwt",
    },
    secret : process.env.AUTH_SECRET,
    

}