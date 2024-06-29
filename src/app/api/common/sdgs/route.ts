import { NextRequest, NextResponse } from "next/server";
import { prismaDb } from "@/lib/prismaDb";

export async function GET(req: NextRequest) {
    try {
        const sdgs = await prismaDb.sdg.findMany();
        return NextResponse.json(
            { data: sdgs, message: "Retrived all SDGs" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Failed to fetch SDGs (Unknown error)" },
            { status: 500 }
        );
    }
}
