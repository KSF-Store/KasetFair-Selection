import { prismaDb } from "@/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // No authorization yet
        const stores = await prismaDb.store.findMany();
        return NextResponse.json(
            {
                data: stores,
                message: "All stores retrived succesful",
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error);
        // Need to implement future handle
        return NextResponse.json({ message: "Unknown error" }, { status: 500 });
    }
}
