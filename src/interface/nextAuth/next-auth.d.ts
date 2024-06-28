// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Define custom user attributes
interface CustomUser extends DefaultUser {
    id: string;
    role: string;
}

// Extend the default session
declare module "next-auth" {
    interface Session {
        user: CustomUser & DefaultSession["user"];
    }
}

// Extend the default JWT
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
    }
}
