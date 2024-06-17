import { NextApiRequest, NextApiResponse } from "next";
import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@/lib/authentication/auth";
import type { Nisit } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const payload: Nisit = req.body;
            const { email, name, role } = payload;
            console.log(email)
            const existingUser = await prismaDb.nisit.findUnique({ where: { email } });
            if (existingUser) {
                return res.json({ message: "User exist", status: 400 });
            }
            const session = await auth();
            if (!session) {
                return res.json({ message: "No permission", status: 400 });
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
