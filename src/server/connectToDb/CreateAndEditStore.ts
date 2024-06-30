"use server";

import {
    StoreCreateEditPayload,
    StorePayload,
    UserPayload,
} from "@/interface/payloadType";
import { CreateEditStoreResponse } from "@/interface/responseType";
import { prismaDb } from "@/lib/prismaDb";
import { createConnectDisconnectObject } from "@/server/connectToDb/ConnectDisconnectObject";
import { connectUserToStore } from "@/server/connectToDb/ConnectUserToStore";
import OnGetCurrentSession from "@/utils/getSession/getCurrentSession";

async function createStore(
    User: UserPayload,
    Store: StorePayload
): Promise<CreateEditStoreResponse> {
    // console.log("In API user  creating : ", User);

    const validInvitingUsers = await prismaDb.user.findMany({
        where: { nisitId: { in: Store.invitingNisitId } },
        select: { userId: true },
    });
    const validSdg = await prismaDb.sdg.findMany({
        where: { sdgId: { in: Store.sdgId } },
        select: { sdgId: true },
    });

    const invitingUpdate = createConnectDisconnectObject({
        fieldName: "inviting",
        validItems: validInvitingUsers.map((user) => user.userId),
        currentItems: [],
        connectField: "userId",
        disconnectField: "userId",
    });

    const sdgUpdate = createConnectDisconnectObject({
        fieldName: "Sdg",
        validItems: validSdg.map((sdg) => sdg.sdgId),
        currentItems: [],
        connectField: "sdgId",
        disconnectField: "sdgId",
    });

    const newStore = await prismaDb.store.create({
        data: {
            storeRole: Store.storeRole,
            name: Store.name,
            description: Store.description,
            slogan: Store.slogan,
            mainProductType: Store.mainProductType,
            subProductType: Store.subProductType,
            innovation: Store.innovation,
            status: Store.status,
            firstPhone: Store.firstPhone,
            secondPhone: Store.secondPhone,
            thirdPhone: Store.thirdPhone,
            ownerId: User.userId, // For Development, On product need to be userId
            ...invitingUpdate,
            ...sdgUpdate,
        },
    });

    if (!newStore) {
        throw new Error("Store creation failed");
    }

    await connectUserToStore(User.nisitId!, newStore.storeId);
    return { data: newStore, message: "Store create succesful" };
}

async function updateStore(
    User: UserPayload,
    newStoreProps: StorePayload
): Promise<CreateEditStoreResponse> {
    // console.log("In API user  update : ", User);

    const storeId = newStoreProps.storeId;
    if (!storeId) {
        throw new Error("Invalid Store id");
    }
    const existdStore = await prismaDb.store.findUnique({
        where: { storeId },
        include: { inviting: true, Member: true, Sdg: true },
    });
    if (!existdStore) {
        throw new Error("Store not existd");
    }

    const currentInviting = existdStore.inviting;
    const validInvitingUsers = await prismaDb.user.findMany({
        where: { nisitId: { in: newStoreProps.invitingNisitId } },
        select: { nisitId: true },
    });
    const invitingUpdate = createConnectDisconnectObject({
        fieldName: "inviting",
        validItems: validInvitingUsers.map((user) => user.nisitId || ""),
        currentItems: currentInviting.map((user) => user.nisitId || ""),
        connectField: "nisitId",
        disconnectField: "nisitId",
    });

    const currentSdg = existdStore.Sdg;
    const validSdg = await prismaDb.sdg.findMany({
        where: { sdgId: { in: newStoreProps.sdgId } },
        select: { sdgId: true },
    });
    const sdgUpdate = createConnectDisconnectObject({
        fieldName: "Sdg",
        validItems: validSdg.map((sdg) => sdg.sdgId),
        currentItems: currentSdg.map((sdg) => sdg.sdgId),
        connectField: "sdgId",
        disconnectField: "sdgId",
    });

    const currentMember = existdStore.Member;
    const memberUpdate = createConnectDisconnectObject({
        fieldName: "Member",
        validItems: [],
        currentItems: currentMember
            .map((member) => member.userId)
            .filter((userId) => userId !== User.userId),
        connectField: "userId",
        disconnectField: "userId",
    });

    const updatedStore = await prismaDb.store.update({
        where: { storeId },
        data: {
            storeRole: newStoreProps.storeRole,
            name: newStoreProps.name,
            description: newStoreProps.description,
            slogan: newStoreProps.slogan,
            mainProductType: newStoreProps.mainProductType,
            subProductType: newStoreProps.subProductType,
            innovation: newStoreProps.innovation,
            status: newStoreProps.status,
            firstPhone: newStoreProps.firstPhone,
            secondPhone: newStoreProps.secondPhone,
            thirdPhone: newStoreProps.thirdPhone,
            ...invitingUpdate,
            ...sdgUpdate,
            ...memberUpdate,
        },
    });

    if (!updatedStore) {
        throw new Error("Store update failed");
    }

    return { data: updatedStore, message: "Store update succesful" };
}

export async function createEditStore(
    payload: StoreCreateEditPayload
): Promise<CreateEditStoreResponse> {
    try {
        const session = await OnGetCurrentSession();
        const Store = payload.Store;
        const User = payload.User;
        console.log(payload);
        // console.log("In API", payload);

        if (!session || !session.user || !session.user.email) {
            throw new Error("Unauthorize");
        }
        const email = session.user.email;
        const existdUser = await prismaDb.user.findUnique({
            where: { email },
            include: { Store: true },
        });

        // console.log(existdUser);
        // const existdUser = await prismaDb.user.findUnique({
        //     where: { userId: User.userId },
        //     select: { storeId: true },
        // });

        // futre handle
        // console.log(existdUser);
        if (!existdUser) {
            throw new Error("User not found");
        }

        let existdStore;
        if (existdUser.storeId) {
            existdStore = await prismaDb.store.findUnique({
                where: { storeId: existdUser.storeId },
                select: { ownerId: true },
            });
        }
        User.userId = existdUser.userId;

        let response;
        if (!existdUser.storeId) {
            console.log("Do Create");

            response = await createStore(User, Store);
        } else if (User.userId === existdStore?.ownerId) {
            console.log("Do Update");
            const { storeId, ...restOfStore } = Store;

            response = await updateStore(User, {
                storeId: Store.storeId || existdUser.storeId,
                ...restOfStore,
            });
        } else {
            console.log("Do Nothing");
            throw new Error("User is not authorized to perform this action");
        }
        return response;
    } catch (error: any) {
        console.log(error);
        throw new Error("Create store failed (Unknown error)", error.message);
    }
}
