import { NextApiRequest, NextApiResponse } from "next";
import type { Nisit } from "@prisma/client";
import { prismaDb } from "@/lib/prismaDb";
import { getUserFromCookie } from "@/utils/jwtAccess/getToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const payload: Nisit = req.body;
            const { email, name, role } = payload;

            console.log(email, name, role);
            const existingUser = await prismaDb.nisit.findUnique({ where: { email } });
            if (existingUser) {
                return res.json({ message: "User exist", status: 400 });
            }
            const newUser = await prismaDb.nisit.create({
                data: {
                    email,
                    name,
                    role,
                },
            });
            return res.json({ data: newUser, message: "User saved", status: 200 });
        } catch (error: any) {
            res.json({ message: "Save user failed", status: 500 });
        }
    }
}
