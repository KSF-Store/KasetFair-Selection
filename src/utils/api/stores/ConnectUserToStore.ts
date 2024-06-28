import { prismaDb } from "@/lib/prismaDb";

export async function connectUserToStore(userId: number, storeId: number) {
    try {
        const existingUser = await prismaDb.user.findUnique({
            where: { userId },
            include: { Store: true },
        });

        if (!existingUser) {
            throw new Error("User not found");
        }
        if (existingUser.Store) {
            throw new Error("User already member of store");
        }

        const updatedUser = await prismaDb.user.update({
            where: { userId },
            data: { Store: { connect: { storeId } } },
        });
        return updatedUser;
    } catch (error: any) {
        throw new Error(error.message || "Connect user to store failed");
    }
}
