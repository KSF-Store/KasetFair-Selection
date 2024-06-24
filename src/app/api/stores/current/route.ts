import { NextRequest, NextResponse } from "next/server";
import { prismaDb } from "@/lib/prismaDb";
import type { NisitStore } from "@prisma/client";
import getNisitAndStore from "@/utils/api/stores/GetNisitAndStore";

export async function GET(req: NextRequest) {
    try {
        const { store } = await getNisitAndStore(req);
        if (store) {
            return NextResponse.json({ data: store, message: "Store found" }, { status: 200 });
        }
        return NextResponse.json({ message: "Store not existed" }, { status: 404 });
    } catch (error: any) {
        return NextResponse.json({ message: "Retrive store failed " }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // init store for current nisit
        const payload = await req.json();
        const { storeName, storeDescription } = payload;

        const { nisit, store } = await getNisitAndStore(req);
        if (store) {
            return NextResponse.json({ message: "Store already created" }, { status: 400 });
        }

        const newStore = await prismaDb.nisitStore.create({
            data: {
                nisitModelId: nisit.id,
                storeName,
                storeDescription: storeDescription || "",
            },
        });
        return NextResponse.json({
            data: newStore,
            message: "Create store successful",
            status: 201,
        });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "Create store failed" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        // update store details for current nisit after register
        const payload: NisitStore = await req.json();
        const { storeName, storeDescription } = payload;

        const { nisit, store } = await getNisitAndStore(req);

        if (!store) {
            return NextResponse.json({ message: "Store not existed" }, { status: 404 });
        }

        const updatedStore = await prismaDb.nisitStore.update({
            where: { id: nisit.id },
            data: {
                storeName: storeName || store.storeName,
                storeDescription: storeDescription || store.storeDescription,
            },
        });
        return NextResponse.json({ data: updatedStore, message: "Store updated" }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "Update store failed" }, { status: 500 });
    }
}
