import { NextRequest, NextResponse } from "next/server";
import { prismaDb } from "@/lib/prismaDb";

export async function POST(req: NextRequest) {
    


    try {
        const store = await prismaDb.store.create({
          data: {
            storeRole,
            name,
            mainProductType,
            subProductType,
            innovation,
            status,
            ownerId,
            isAssigned: false,  // default value
          },
        });
    }
    catch(error:any) {
        console.log('ee')
    }



    // userId          Int       @id @default(autoincrement())
    // nisitId         String    @unique
    // name            String
    // faculty         String
    // year            Int
    // address         String
    // phone           String    
    // reservePhone1   String?
    // reservePhone2   String?
    // storeId         Int?
    // Store           Store?    @relation(fields: [storeId], references: [storeId])
  }
}

export async function PUT() {
    
}