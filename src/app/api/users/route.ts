import { NextRequest, NextResponse } from "next/server";
import type { Nisit } from "@prisma/client";
import { prismaDb } from "@/lib/prismaDb";

export async function POST(req: NextRequest) {
    try {
        const payload: Nisit = await req.json();
        const { email, name, role } = payload;

        console.log(email, name, role);
        const existingUser = await prismaDb.nisit.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ message: "User exist" }, { status: 400 });
        }
        const newUser = await prismaDb.nisit.create({
            data: {
                email,
                name,
                role,
            },
        });
        return NextResponse.json({ data: newUser, message: "User saved" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Save user failed" }, { status: 500 });
    }
}
