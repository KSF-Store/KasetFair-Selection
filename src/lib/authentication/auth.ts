import NextAuth from "next-auth";
import jwt from "jsonwebtoken";
import { authOptions } from "@/lib/authentication/authOptions";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export function generateToken(payload: object, expiresIn: string): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export function verifyToken(token: string): jwt.JwtPayload | null {
    try {
        return jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}
