import { NextRequest, NextResponse } from "next/server";
import { prismaDb } from "@/lib/prismaDb";

export default async function POST(req: NextRequest) {
    try {
        const {
            nisitId,
            role,
            name,
            faculty,
            year,
            address,
            phone,
            reservePhone1 = "",
            reservePhone2 = "",
        } = await req.json();

        // Create the user
        const user = await prismaDb.user.create({
            data: {
                nisitId,
                role,
                name,
                faculty,
                year,
                address,
                phone,
                reservePhone1,
                reservePhone2,
            },
        });
        const response = NextResponse.json(
            { data: user, message: "User registered successfully" },
            { status: 201 }
        );
        return response;
    } catch (error: any) {
        if (error.code === "P2002") {
            return NextResponse.json(
                { message: "Nisit ID already exists" },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { message: "User registration failed" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    // try {
    //     const userId = await getDataFromToken(req);
    //     if (!userId) {
    //         return NextResponse.json(
    //             { message: "Unauthorized request" },
    //             { status: 401 }
    //         );
    //     }

    //     const userData = await prismaDb.user.findUnique({ where: { userId } });
    //     if (!userData) {
    //         return NextResponse.json(
    //             { message: "User not found" },
    //             { status: 404 }
    //         );
    //     }

    //     return NextResponse.json(
    //         { data: userData, message: "User retrieved successfully" },
    //         { status: 200 }
    //     );
    // } catch (error: any) {
    //     console.error("Error retrieving user:", error);
    //     return NextResponse.json(
    //         { message: "Internal server error" },
    //         { status: 500 }
    //     );
    // }
}
