"use server";
import { prismaDb } from "@/lib/prismaDb";
import { UserPayload } from "@/interface/payloadType";
import OnGetCurrentSession from "@/utils/getSession/getCurrentSession";
import { UpdateUserResponse } from "@/interface/responseType";

export async function updateUser(
    User: UserPayload
): Promise<UpdateUserResponse> {
    try {
        const session = await OnGetCurrentSession();
        if (!session || !session.user || !session.user.email) {
            throw new Error("Unauthorize");
        }

        const email = session.user.email;
        const exisitingUser = await prismaDb.user.findUnique({
            where: { email },
        });
        if (!exisitingUser) {
            throw new Error("User not found");
        }

        const updatedUser = await prismaDb.user.update({
            where: { email },
            data: {
                nisitId: User.nisitId || exisitingUser.nisitId,
                prefix: User.prefix || exisitingUser.prefix,
                name: User.name || exisitingUser.name,
                faculty: User.faculty || exisitingUser.faculty,
                year: User.year || exisitingUser.year,
                address: User.address || exisitingUser.address,
                phone: User.phone || exisitingUser.phone,
            },
        });
        return { data: updatedUser, message: "User updated succesful" };
    } catch (error: any) {
        console.log(error.message);
        throw new Error("User update failed (Unknown error)");
    }
}
