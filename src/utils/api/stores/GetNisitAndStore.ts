import { NextRequest } from "next/server";
import { prismaDb } from "@/lib/prismaDb";
import { getUserFromCookie } from "@/utils/jwtAccess/getToken";

export default async function getNisitAndStore(req: NextRequest) {
    const user = await getUserFromCookie(req);
    if (!user) {
        throw new Error("Session unauthorized");
    }

    const nisitWithStore = await prismaDb.nisit.findUnique({
        where: { email: user.email! },
        include: { Store: true },
    });

    if (!nisitWithStore) {
        throw new Error("Nisit not found");
    }
    const { Store: store = null, ...nisit } = nisitWithStore;
    return { nisit, store };
}
