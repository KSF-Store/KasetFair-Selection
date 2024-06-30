import { StoreType, UserType } from "./dbType";

export type StorePayload = Omit<
    StoreType,
    "Sdg" | "Booth" | "boothId" | "isAssigned" | "Member" | "inviting" | "User"
> & {
    invitingNisitId?: string[] | null;
    sdgId?: number[];
};

export type UserPayload = Omit<UserType, "Store">;

export interface StoreCreateEditPayload {
    User: UserPayload;
    Store: StorePayload;
}

export interface SdgPayload {
    sdgId: number;
    name: string;
}
