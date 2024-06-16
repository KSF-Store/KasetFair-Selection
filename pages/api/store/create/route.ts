import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const nisitId = searchParams.get("nisitId");
        const storeName = searchParams.get("storeName");
        const storeDescription = searchParams.get("storeDescription");

        if (!nisitId || !storeName) return;

        const nisit = await prisma.nisit.findUnique({ where: { nisitId } });
        if (!nisit) {
            return NextResponse.json({ error: "Nisit not found" }, { status: 404 });
        }

        const newStore = await prisma.nisitStore.create({
            data: {
                nisitId,
                storeName,
                storeDescription: storeDescription || "",
            },
        });
        return NextResponse.json({ message: "Store created", store: newStore }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
}
