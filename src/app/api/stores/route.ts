import { NextResponse } from "next/server";
import { prismaDb } from "@/lib/prismaDb";

export async function GET() {
    // get all stores on database for admin dashboard
    // Prototype, Now using cookie to retrive store
    try {
        // Authorization need here
        const stores = await prismaDb.nisitStore.findMany();
        if (stores) {
            return NextResponse.json({ data: stores, message: "Store found", status: 200 });
        }
        return NextResponse.json({
            message: "There's somthing is wrong with database",
            status: 404,
        });
    } catch (error: any) {
        return NextResponse.json({ message: "Retrive store failed ", status: 500 });
    }
}
