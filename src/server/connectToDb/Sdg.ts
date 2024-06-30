"use server";
import { prismaDb } from "@/lib/prismaDb";
import { GetAllSdgsResponse } from "@/interface/responseType";

export async function getAllSdgs(): Promise<GetAllSdgsResponse> {
    try {
        const sdgs = await prismaDb.sdg.findMany();
        return { data: sdgs, message: "Retrived all SDGs" };
    } catch (error: any) {
        console.log(error.message);
        throw new Error("Fail to fetch Sdgs");
    }
}
