'use server'

import { prismaDb } from "@/lib/prismaDb";

import OnGetCurrentSession from "@/utils/getSession/getCurrentSession";

export const OnGettingStoreOfUser = async () => {
    try {
        const session = await OnGetCurrentSession() 

        const existingUser = await prismaDb.user.findUnique({
            where: { email : session.user.email?.toString()},
            include: { Store: true ,invited : true },
        });

        if (!existingUser) {
            throw new Error("User not found");
        }
        console.log('exitsed details of store & user : ',existingUser)
        return existingUser ;
    } catch (error: any) {
        throw new Error(error.message || "Get store of user failed");
    }
}