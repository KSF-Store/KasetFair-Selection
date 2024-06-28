import { prismaDb } from "@/lib/prismaDb";

export async function disconnectUserFromStore(userId: number, storeId: number) {
    try {
        const existingUser = await prismaDb.user.findUnique({
            where: { userId },
            include: { Store: true },
        });

        if (!existingUser) {
            throw new Error("User not found");
        }
        if (!existingUser.Store) {
            throw new Error("User not already member of any store");
        }

        const updatedUser = await prismaDb.user.update({
            where: { userId },
            data: { Store: { disconnect: { storeId } } },
        });
        return updatedUser;
    } catch (error: any) {
        throw new Error(error.message || "Connect user to store failed");
    }
}
