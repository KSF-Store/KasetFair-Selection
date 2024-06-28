import { StoreType, UserType } from "./dbType";

export type StorePayload = Omit<
    StoreType,
    "Sdg" | "Booth" | "boothId" | "isAssigned" | "Member"
> & {
    memberUserId?: number[];
    invitingNisitId?: string[];
    sdgId?: number[];
};

export type UserPayload = UserType;

export interface StoreEditPayload {
    User: UserPayload;
    Store: StorePayload;
}
