
import { prismaDb } from "@/lib/prismaDb";

export default async function OnAddUserToDb(user: any) {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    try {
        const response = await prismaDb.user.create({
            data : {
                nisitId: user?.nisitId,
                role: user?.role,
                name: user?.name,
                faculty: user?.faculty,
                year: user?.year,
                address: user?.address,
                phone: user?.phone,
                reservePhone1: user?.reservePhone1,
                reservePhone2: user?.reservePhone2,
            }
        })


    } catch (error: any) {
        console.log(error);
    }
}
