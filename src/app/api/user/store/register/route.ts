import { NextRequest, NextResponse } from "next/server";
import { prismaDb } from "@/lib/prismaDb";

import { StoreEditPayload } from "@/interface/payloadType";

export async function POST(req: NextRequest) {
    try {
        //           user: {
        //       |     userId: 1,
        //       |     name: 'trettre',
        //       |     nisitId: '43trert',
        //       |     faculty: 'rere',
        //       |     year: 4,
        //       |     phone: '435rt',
        //       |     reservePhone1: '',
        //       |     reservePhone2: ''
        //       |   },
        //       |   store: {
        //       |     name: 'rettre',
        //       |     description: '',
        //       |     slogan: '',
        //       |     mainProductType: 'rteert',
        //       |     subProductType: 'rteret',
        //       |     innovation: 're',
        //       |     invitingNisitId: [],
        //       |     sdgId: [ 1, 2, 3 ]
        //       |   }
        //       | }

        const payload: StoreEditPayload = await req.json();
        console.log("In API", payload);

        const Store = payload.Store;
        const User = payload.User;

        const validInvitingUsers = await prismaDb.user.findMany({
            where: { nisitId: { in: Store.invitingNisitId } },
            select: { userId: true },
        });
        const validSdg = await prismaDb.sdg.findMany({
            where: { sdgId: { in: Store.sdgId } },
            select: { sdgId: true },
        });

        const store = await prismaDb.store.create({
            data: {
                storeRole: Store.storeRole,
                name: Store.name,
                description: Store.description,
                slogan: Store.slogan,
                mainProductType: Store.mainProductType,
                subProductType: Store.subProductType,
                innovation: Store.innovation,
                status: Store.status,
                ownerId: User.userId,
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
        return NextResponse.json(
            {
                data: store,
                message: "Create store succesful",
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { message: "Create store failed" },
            { status: 500 }
        );
        // handle
        // .
        // .
    }
}

export async function PUT(req: NextRequest) {
    try {
        const {
            userId,
            storeRole,
            name,
            mainProductType,
            subProductType,
            innovation,
            ownerId,
        } = await req.json();

        if (userId != ownerId) {
            return NextResponse.json(
                { message: "No access to update store" },
                { status: 400 }
            );
        }

        const user = await prismaDb.user.findUnique({
            where: { userId },
            include: { Store: true },
        });
        if (!user) {
            return NextResponse.json(
                { message: "User not existd" },
                { status: 404 }
            );
        }

        const store = user.Store;
        if (!store) {
            return NextResponse.json(
                { message: "Store not existd" },
                { status: 404 }
            );
        }

        const updatedStore = await prismaDb.store.update({
            where: {
                storeId: store.storeId,
            },
            data: {
                storeRole: storeRole || store.storeRole,
                name: name || store.name,
                mainProductType: mainProductType || store.mainProductType,
                subProductType: subProductType || store.subProductType,
                innovation: innovation || store.innovation,
                ownerId: ownerId || store.ownerId,
            },
        });
        return NextResponse.json(
            { data: updatedStore, message: "Update store succesful" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: "Update store failed" },
            { status: 500 }
        );
        // handle
        // .
        // .
    }
}
