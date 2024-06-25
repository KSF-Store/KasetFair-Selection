import { NextApiRequest, NextApiResponse } from "next";
import { prismaDb } from "@/lib/prismaDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // get or set with target req store's nisit
    const method = req.method ; 
    const { id } = req.query ;
    console.log(id)
    if (method === "GET"){  
        try{
            const data = await prismaDb.nisit.findUnique({
                where : { email : String(id) },
                include : { Store : true }
            })

            if (data){
                return res.json({ data: data, message: "User existed on database", status: 200 });
            }
            return res.json({ message: "User not existed", status: 404 });
        }catch(err){
            console.log(err)
        }
    }   
}
