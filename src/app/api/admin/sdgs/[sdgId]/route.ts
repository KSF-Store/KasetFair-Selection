import { prismaDb } from "@/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    sdgId: string
}

export async function DELETE(req: NextRequest, context: {params: Params }) {
    try {
      const sdgIdString = context.params.sdgId;
      const sdgId = Number(sdgIdString);
    
      if (!sdgId) {
        return NextResponse.json(
          { message: "SDG ID is required" },
          { status: 400 }
        );
      }
  
      const existingSdg = await prismaDb.sdg.findUnique({
        where: { sdgId },
      });
  
      if (!existingSdg) {
        return NextResponse.json(
          { message: "SDG not found" },
          { status: 404 }
        );
      }
  
      await prismaDb.sdg.delete({
        where: { sdgId },
      });
  
      return NextResponse.json(
        { message: "SDG deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Failed to delete SDG (Unknown error)" },
        { status: 500 }
      );
    }
  }