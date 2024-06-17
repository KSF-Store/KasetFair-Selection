import { getToken } from "next-auth/jwt";

const secret = process.env.AUTH_SECRET;

export const getUserFromCookie = async (req) => {
    try {
        const token = await getToken({ req, secret });
        return token;
    } catch (error) {
        console.error("Error getting user from cookie:", error);
        return null;
    }
};
