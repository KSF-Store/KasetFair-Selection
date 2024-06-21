import { NextApiRequest, NextApiResponse } from "next";
import { prismaDb } from "@/lib/prismaDb";
import type { NisitStore } from "@prisma/client";
import getNisitAndStore from "@/utils/api/stores/GetNisitAndStore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // get all stores on database for admin dashboard
    if (req.method === "GET") {
        // Prototype, Now using cookie to retrive store
        try {
            const stores = await prismaDb.nisitStore.findMany() ; 
            if (stores){
                return res.json({ data: stores, message: "Store found", status: 200 });
            }
            return res.json({ message: "There's somthing is wrong with database", status: 404 });
        } catch (error: any) {
            return res.json({ message: "Retrive store failed ", status: 500 });
        }
    }
}
