import { prismaDb } from "@/lib/prismaDb";

export async function connectUserToStore(nisitId: string, storeId: number) {
    try {
        const existingUser = await prismaDb.user.findUnique({
            where: { nisitId },
            include: { Store: true },
        });

        if (!existingUser) {
            throw new Error("User not found");
        }
        if (existingUser.Store) {
            throw new Error("User already member of any store");
        }

        const updatedUser = await prismaDb.user.update({
            where: { nisitId },
            data: { Store: { connect: { storeId } }},
        });
        return updatedUser;
    } catch (error: any) {
        throw new Error(error.message || "Connect user to store failed");
    }
}
