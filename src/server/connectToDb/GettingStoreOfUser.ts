"use server";

import { GetUserWithStoreResponse } from "@/interface/responseType";
import { prismaDb } from "@/lib/prismaDb";

import OnGetCurrentSession from "@/utils/getSession/getCurrentSession";

export const OnGettingStoreOfUser = async () => {
    try {
        const session = await OnGetCurrentSession();

        const existingUser = await prismaDb.user.findUnique({
            where: { email: session.user.email?.toString() },
            include: {
                Store: {
                    include: {
                        Booth: true,
                        Sdg: true,
                        Category : true,
                        Member: true
                    } 
                },
                invited:true
            }
        })
        // Store: { include: { sigs: true } }, invited: true

        if (!existingUser) {
            throw new Error("User not found");
        }
        console.log("exitsed details of store & user : ", existingUser);
        return existingUser;
    } catch (error: any) {
        throw new Error(error.message || "Get store of user failed");
    }
};

export async function getUserAndStore(): Promise<GetUserWithStoreResponse> {
    try {
        const session = await OnGetCurrentSession();
        if (!session || !session.user || !session.user.email) {
            throw new Error("Unauthorize");
        }

        const email = session.user.email;
        const user = await prismaDb.user.findUnique({
            where: { email },
            include: { Store: true },
        });
        if (!user) {
            throw new Error("User not found");
        }

        let allStoreProps;
        if (user.Store) {
            allStoreProps = await prismaDb.store.findUnique({
                where: { storeId: user.Store.storeId },
                include: { inviting: true, Member: true, Sdg: true },
            });
        }

        const { Store, ...userWithoutStore } = user;
        const responseData = { User: userWithoutStore, Store: allStoreProps };
        return { data : responseData, message: "Store retrived succesful" };
    } catch (error: any) {
        console.log(error);
        throw new Error("Get store failed (Unknown error");
    }
}
