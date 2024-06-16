import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, storeName, storeDescription } = reqBody;

        const existingStore = await prisma.nisitStore.findUnique({ where: { id } });
        if (!existingStore) {
            return NextResponse.json({ error: "Store not found" }, { status: 404 });
        }

        const updatedStore = await prisma.nisitStore.update({
            where: id,
            data: {
                storeName: storeName || existingStore.storeName,
                storeDescription: storeDescription || existingStore.storeDescription,
            },
        });
        return NextResponse.json(
            { message: "Store updated", store: updatedStore },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
}
