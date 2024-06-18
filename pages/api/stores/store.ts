import { NextApiRequest, NextApiResponse } from "next";
import { prismaDb } from "@/lib/prismaDb";
import type { NisitStore } from "@prisma/client";
import getNisitAndStore from "@/utils/api/stores/GetNisitAndStore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const payload = req.body;
            const { storeName, storeDescription } = payload;

            const { nisit, store } = await getNisitAndStore(req);
            if (store) {
                return res.json({ message: "Store already created", status: 400 });
            }

            const newStore = await prismaDb.nisitStore.create({
                data: {
                    nisitModelId: nisit.id,
                    storeName,
                    storeDescription: storeDescription || "",
                },
            });
            return res.json({ data: newStore, message: "Create store successful", status: 201 });
        } catch (error: any) {
            console.log(error);
            return res.json({ message: "Create store failed", status: 500 });
        }
    } else if (req.method === "PUT") {
        try {
            const payload: NisitStore = req.body;
            const { storeName, storeDescription } = payload;

            const { nisit, store } = await getNisitAndStore(req);

            if (!store) {
                return res.json({ message: "Store not existed", status: 404 });
            }

            const updatedStore = await prismaDb.nisitStore.update({
                where: { id: nisit.id },
                data: {
                    storeName: storeName || store.storeName,
                    storeDescription: storeDescription || store.storeDescription,
                },
            });
            return res.json({ data: updatedStore, message: "Store updated", status: 200 });
        } catch (error: any) {
            console.log(error);
            return res.json({ message: "Update store failed", status: 500 });
        }
    } else if (req.method === "GET") {
        // Prototype, Now using cookie to retrive store
        try {
            const { nisit, store } = await getNisitAndStore(req);
            if (!store) {
                return res.json({ message: "Store not existed", status: 404 });
            }
            return res.json({ data: store, message: "Store found", status: 200 });
        } catch (error: any) {
            return res.json({ message: "Retrive store failed ", status: 500 });
        }
    }
}
