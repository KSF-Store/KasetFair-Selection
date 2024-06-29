import { prismaDb } from "@/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";
import { Sdg } from "@/interface/dbType";

export async function POST(req: NextRequest) {
  try {
    const payload: Sdg = await req.json();

    const existingSdg = await prismaDb.sdg.findUnique({
      where: { sdgId: payload.sdgId },
    });

    if (existingSdg) {
        const updatedSdg = await prismaDb.sdg.update({
            where: { sdgId: payload.sdgId },
            data: {
              name: payload.name,
            },
          });
      
        return NextResponse.json(updatedSdg);
    }

    const sdg = await prismaDb.sdg.create({
      data: {
        sdgId: payload.sdgId,
        name: payload.name,
      },
    });

    return NextResponse.json(sdg);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "POST SDG Failed (Unknown error)" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
    try {
      const sdgs = await prismaDb.sdg.findMany();
      return NextResponse.json(sdgs);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Failed to fetch SDGs (Unknown error)" },
        { status: 500 }
      );
    }
  }
