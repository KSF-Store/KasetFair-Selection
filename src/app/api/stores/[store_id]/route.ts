import { NextRequest, NextResponse } from "next/server";
import { prismaDb } from "@/lib/prismaDb";

export async function GET(req: NextRequest, { params }: { params: { store_id: string } }) {
    // get or set with target req store's nisit
    const storeId = params.store_id;
    try {
        // Authorization need here

        const store = await prismaDb.nisitStore.findUnique({
            where: { id: Number(storeId) },
        });
        if (store) {
            return NextResponse.json({ data: store, message: "Store found" }, { status: 200 });
        }
        return NextResponse.json({ message: "Store not existed" }, { status: 404 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Store retrive failed" }, { status: 500 });
    }
}
