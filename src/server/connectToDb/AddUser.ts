import { prismaDb } from "@/lib/prismaDb";

import { v4 as uuidv4 } from "uuid";

export default async function OnAddUserToDb(user: any) {
    // const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    console.log(user);
    try {
        const response = await prismaDb.user.create({
            data: {
                // userId: 1000,
                nisitId: uuidv4(),
                role: user.role || null, // Optional field
                name: user.name,
                email: user.email,
                faculty: user.faculty || null, // Optional field
                year: user.year || null, // Optional field
                address: user.address || null, // Optional field
                phone: user.phone || null,
                storeId: user.storeId || null, // Optional field
            },
        });
        // console.log(response)
    } catch (error: any) {
        console.log(error);
    }
}
