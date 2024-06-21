import { NextApiRequest, NextApiResponse } from "next";
import { prismaDb } from "@/lib/prismaDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // get or set with target req store's nisit
    const method = req.method ; 
    const { store_id } = req.query ;
    if (method === "GET"){  
        try{
            const store = await prismaDb.nisitStore.findUnique({
                where : { id : Number(store_id) },
            })
            if (store){
                return res.json({ data: store, message: "Store found", status: 200 });
            }
            return res.json({ message: "Store not existed", status: 404 });
        }catch(err){
            console.log(err)
        }
    }   
}
