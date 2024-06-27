import { cookies } from "next/headers";
import type jwt from "jsonwebtoken";
import { generateToken, verifyToken } from "@/lib/authentication/auth";

export function setCookie(
    name: string,
    payload: object,
    expiresIn: string = "7d"
) {
    try {
        const token = generateToken(payload, expiresIn);
        cookies().set(name, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: getMaxAge(expiresIn),
            path: "/",
        });
        return true;
    } catch (error) {
        console.error("Error setting cookie:", error);
        return false;
    }
}

export function getDataFromCookie(name: string): jwt.JwtPayload | null {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get(name)?.value;

        if (!token) {
            console.error("No token found in cookie");
            return null;
        }

        const decodedToken = verifyToken(token);
        return decodedToken;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

function getMaxAge(expiresIn: string): number {
    const units = { s: 1, m: 60, h: 3600, d: 86400 };
    const match = expiresIn.match(/(\d+)(\w)/);
    if (match) {
        const [, value, unit] = match;
        return parseInt(value) * (units[unit as keyof typeof units] || 0);
    }
    return 7 * 86400;
}
