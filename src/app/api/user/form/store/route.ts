import { NextRequest, NextResponse } from "next/server";
import { prismaDb } from "@/lib/prismaDb";

export async function POST(req: NextRequest) {
    try {
        const {
            storeRole,
            name,
            mainProductType,
            subProductType,
            innovation,
            ownerId,
        } = await req.json();

        const store = await prismaDb.store.create({
            data: {
                storeRole,
                name,
                mainProductType,
                subProductType,
                innovation,
                status: 1,
                ownerId,
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
