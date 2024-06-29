import { prismaDb } from "@/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";
import { Category } from "@/interface/dbType";

export async function POST(req: NextRequest) {
  try {
    const payload: Category = await req.json();
    console.log("payload", payload);
    const existingCategory = await prismaDb.category.findUnique({
      where: { categoryId: payload.categoryId },
    });

    if (existingCategory) {
        const updatedCategory = await prismaDb.category.update({
            where: { categoryId: payload.categoryId },
            data: {
              name: payload.name,
            },
          });
      
        return NextResponse.json(updatedCategory);
    }

    const category= await prismaDb.category.create({
      data: {
        categoryId: payload.categoryId,
        name: payload.name,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "POST Category Failed (Unknown error)" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
    try {
      const category = await prismaDb.category.findMany();
      return NextResponse.json(category);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Failed to fetch Category (Unknown error)" },
        { status: 500 }
      );
    }
  }
