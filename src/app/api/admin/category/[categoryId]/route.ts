import { prismaDb } from "@/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    categoryId: string
}

export async function DELETE(req: NextRequest, context: {params: Params }) {
    try {
      const categoryIdString = context.params.categoryId;
      const categoryId = Number(categoryIdString);
    
      if (!categoryId) {
        return NextResponse.json(
          { message: "Category ID is required" },
          { status: 400 }
        );
      }
  
      const existingCategory = await prismaDb.category.findUnique({
        where: { categoryId },
      });
  
      if (!existingCategory) {
        return NextResponse.json(
          { message: "Category not found" },
          { status: 404 }
        );
      }
  
      await prismaDb.category.delete({
        where: { categoryId },
      });
  
      return NextResponse.json(
        { message: "Category deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Failed to delete Category (Unknown error)" },
        { status: 500 }
      );
    }
  }