import { StoreType, UserType } from "./dbType";

export type StorePayload = Omit<
    StoreType,
    "Sdg" | "Booth" | "boothId" | "isAssigned" | "Member"
> & {
    invitingNisitId: string[];
    sdgId: number[];
};

export interface StoreEditPayload {
    User: UserType;
    Store: StorePayload;
}
