import { NextApiRequest, NextApiResponse } from "next";
import { prismaDb } from "@/lib/prismaDb";
import type { NisitStore } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const payload: NisitStore = req.body;
            const { nisitId, storeName, storeDescription } = payload;

            const nisit = await prismaDb.nisit.findUnique({ where: { nisitId } });
            if (!nisit) {
                return res.json({ message: "User not found", status: 404 });
            }

            const newStore = await prismaDb.nisitStore.create({
                data: {
                    nisitId,
                    storeName,
                    storeDescription: storeDescription || "",
                },
            });
            return res.json({ data: newStore, message: "Create store successful", status: 201 });
        } catch (error: any) {
            return res.json({ message: "Create store failed", status: 500 });
        }
    } else if (req.method === "PUT") {
        try {
            const payload: NisitStore = req.body;
            const { id, storeName, storeDescription } = payload;

            const existingStore = await prismaDb.nisitStore.findUnique({ where: { id } });
            if (!existingStore) {
                return res.json({ error: "Store not found", status: 404 });
            }

            const updatedStore = await prismaDb.nisitStore.update({
                where: { id },
                data: {
                    storeName: storeName || existingStore.storeName,
                    storeDescription: storeDescription || existingStore.storeDescription,
                },
            });
            return res.json({ data: updatedStore, message: "Store updated", status: 200 });
        } catch (error: any) {
            console.log(error);
            return res.json({ message: "Update store failed", status: 500 });
        }
    } else if (req.method === "GET") {
        const { id } = req.query;
        if (id) {
            if (!id || typeof id !== "string") {
                return res.json({ message: "Invalid id parameter", status: 400 });
            }
            const parseId = parseInt(id, 10);
            const store = prismaDb.nisitStore.findUnique({ where: { id: parseId } });
            if (!store) {
                return res.json({ message: "Store not found", status: 404 });
            }
            return res.json({ data: store, message: "Store found", status: 200 });
        } else {
            const stores = await prismaDb.nisitStore.findMany();
            return res.json({
                data: stores,
                message: "Retrieve all stores successful",
                status: 200,
            });
        }
    }
}
