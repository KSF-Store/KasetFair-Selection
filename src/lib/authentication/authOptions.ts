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
    callbacks: {
        async jwt({ token, user }) {
          // Add custom attributes to the token here
          if (user) {
            token.id = user.id;
            token.role = "user"; // Example: adding a custom role attribute
            // Add more custom attributes as needed
          }
          return token;
        },
        async session({ session, token }) {
          // Add custom attributes to the session here
          if (token) {
            session.user.id = token.id ;
            session.user.role = "kuykheng"; // Example: adding the custom role attribute to the session
            // Add more custom attributes as needed
          }
          return session;
        },
    }

}