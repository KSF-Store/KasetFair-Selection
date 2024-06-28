import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import OnAddUserToDb from "@/server/connectToDb/AddUser";
import { CustomUser } from "@/interface/nextAuth/next-auth";

const adminEmails = ["pornthep.ho@ku.th"];

export const authOptions: NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                },
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
        signOut: "/sign-out",
        error: "/auth-error",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            const customUser: CustomUser = {
                ...user,
                id: String(user.id),
                role: adminEmails.includes(user.email!) ? "admin" : "user",
            };
            // Custom logic after user signs in
            await OnAddUserToDb(customUser); // Call your function to add the user to the database
            console.log("In authOptions: ", customUser);
            // console.log("Account : ", account);
            // console.log("Profile : ", profile);
            return true;
        },
        async jwt({ token, user }) {
            // Add custom attributes to the token here
            if (user) {
                const customUser = user as CustomUser;
                token.id = String(customUser.id);
                token.role = customUser.role || "user"; // Example: adding a custom role attribute
                // Add more custom attributes as needed
            }
            return token;
        },
        async session({ session, token }) {
            // Add custom attributes to the session here
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role; // Example: adding the custom role attribute to the session
                // Add more custom attributes as needed
            }
            return session;
        },
    },
};
