import { NextRequest, NextResponse } from "next/server";
import { prismaDb } from "@/lib/prismaDb";
import { StoreEditPayload } from "@/interface/payloadType";
import { connectUserToStore } from "@/utils/api/stores/ConnectUserToStore";

export async function POST(req: NextRequest) {
    try {
        const payload: StoreEditPayload = await req.json();
        const Store = payload.Store;
        const User = payload.User;
        console.log("In API", payload);
        // if (isNotmemberOfany) {
        //     createStroe();
        // }
        // if ((storeOwner = userid)) {
        //     updateStore();
        // }

        const validInvitingUsers = await prismaDb.user.findMany({
            where: { nisitId: { in: Store.invitingNisitId } },
            select: { userId: true },
        });
        const validSdg = await prismaDb.sdg.findMany({
            where: { sdgId: { in: Store.sdgId } },
            select: { sdgId: true },
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
                inviting: validInvitingUsers
                    ? {
                          connect: validInvitingUsers.map(({ userId }) => ({
                              userId,
                          })),
                      }
                    : undefined,
                Sdg: validSdg
                    ? { connect: validSdg.map(({ sdgId }) => ({ sdgId })) }
                    : undefined,
            },
        });

        if (!newStore) {
            return NextResponse.json(
                {
                    message: "Create store failed in try",
                },
                { status: 500 }
            );
        }

        const updatedUser = await connectUserToStore(
            User.userId,
            newStore.storeId
        );
        return NextResponse.json(
            {
                data: { updatedUser, newStore },
                message: "Create store succesful",
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { message: "Create store failed (Unknown error)" },
            { status: 500 }
        );
        // handle
        // .
        // .
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
        const store = user?.Store;
        if (!store) {
            return NextResponse.json(
                { message: "User is not member of any store" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { data: store, message: "Store retrived succesful" },
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
