import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/authentication/auth";

export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("tokenAlt")?.value || "";
        const decodedToken: any = verifyToken(token);
        console.log(decodedToken);
        return decodedToken;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
