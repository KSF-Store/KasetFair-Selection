import { NextRequest, NextResponse } from "next/server";
import { prismaDb } from "@/lib/prismaDb";
import {
    StoreEditPayload,
    StorePayload,
    UserPayload,
} from "@/interface/payloadType";
import { connectUserToStore } from "@/utils/api/stores/ConnectUserToStore";
import { createConnectDisconnectObject } from "@/utils/api/stores/ConnectDisconnectObject";

async function createStore(User: UserPayload, Store: StorePayload) {
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

    await connectUserToStore(User.userId, newStore.storeId);
    return { payload: newStore, message: "Store create succesful" };
}

async function updateStore(User: UserPayload, newStoreProps: StorePayload) {
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
        select: { userId: true },
    });
    const invitingUpdate = createConnectDisconnectObject({
        fieldName: "inviting",
        validItems: validInvitingUsers.map((user) => user.userId),
        currentItems: currentInviting.map((user) => user.userId),
        connectField: "userId",
        disconnectField: "userId",
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
        where: { storeId: newStoreProps.storeId },
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

    return { payload: updatedStore, message: "Store update succesful" };
}

export async function POST(req: NextRequest) {
    try {
        const payload: StoreEditPayload = await req.json();
        const Store = payload.Store;
        const User = payload.User;
        console.log("In API", payload);

        const existdUser = await prismaDb.user.findUnique({
            where: { userId: User.userId },
            select: { storeId: true },
        });
        // futre handle
        console.log(existdUser);
        if (!existdUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        let existdStore;
        if (existdUser.storeId) {
            existdStore = await prismaDb.store.findUnique({
                where: { storeId: existdUser.storeId! },
                select: { ownerId: true },
            });
        }

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
            return NextResponse.json(
                { message: "User is not authorized to perform this action" },
                { status: 403 }
            );
        }
        return NextResponse.json({ ...response }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { message: "Create store failed (Unknown error)" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const userIdString = req.nextUrl.searchParams.get("userId") as string;
        const userId = Number(userIdString);

        if (isNaN(userId)) {
            return NextResponse.json(
                { error: "Invalid userId" },
                { status: 400 }
            );
        }

        const user = await prismaDb.user.findUnique({
            where: { userId },
            include: { Store: true },
        });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const store = user?.Store;
        if (!store) {
            return NextResponse.json(
                { message: "User is not member of any store" },
                { status: 300 }
            );
        }
        return NextResponse.json(
            { payload: store, message: "Store retrived succesful" },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { message: "Get store failed (Unknown error)" },
            { status: 500 }
        );
    }
}

// export async function PUT(req: NextRequest) {
//     try {
//         const {
//             userId,
//             storeRole,
//             name,
//             mainProductType,
//             subProductType,
//             innovation,
//             ownerId,
//         } = await req.json();

//         if (userId != ownerId) {
//             return NextResponse.json(
//                 { message: "No access to update store" },
//                 { status: 400 }
//             );
//         }

//         const user = await prismaDb.user.findUnique({
//             where: { userId },
//             include: { Store: true },
//         });
//         if (!user) {
//             return NextResponse.json(
//                 { message: "User not existd" },
//                 { status: 404 }
//             );
//         }

//         const store = user.Store;
//         if (!store) {
//             return NextResponse.json(
//                 { message: "Store not existd" },
//                 { status: 404 }
//             );
//         }

//         const updatedStore = await prismaDb.store.update({
//             where: {
//                 storeId: store.storeId,
//             },
//             data: {
//                 storeRole: storeRole || store.storeRole,
//                 name: name || store.name,
//                 mainProductType: mainProductType || store.mainProductType,
//                 subProductType: subProductType || store.subProductType,
//                 innovation: innovation || store.innovation,
//                 ownerId: ownerId || store.ownerId,
//             },
//         });
//         return NextResponse.json(
//             { data: updatedStore, message: "Update store succesful" },
//             { status: 200 }
//         );
//     } catch (error: any) {
//         return NextResponse.json(
//             { message: "Update store failed" },
//             { status: 500 }
//         );
//         // handle
//         // .
//         // .
//     }
// }
