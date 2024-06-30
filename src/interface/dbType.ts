export interface UserType {
    userId?: number;
    nisitId?: string | null;
    role?: string | null;
    prefix?: string | null;
    name?: string | null;
    faculty?: string | null;
    year?: number | null;
    address?: string | null;
    phone?: string | null;
    storeId?: number | null;
    Store?: StoreType | null;
    invited?: StoreType[] | null;
}

export interface StoreType {
    storeId?: number | null;
    storeRole?: string | null;
    name?: string | null;
    description?: string | null;
    slogan?: string | null;
    mainProductType?: string | null; // Assuming this cannot be null based on your existing definition
    subProductType?: string | null;
    innovation?: string | null;
    firstPhone?: string | null;
    secondPhone?: string | null;
    thirdPhone?: string | null;
    status?: StoreStatus | null; // Assuming this can be null
    ownerId?: number | null;
    Member?: UserType[] | null;
    isAssigned?: boolean | null;
    boothId?: number | null;
    Booth?: Booth | null;
    Sdg?: Sdg[] | null;
    inviting?: UserType[] | null;
}

export interface Sdg {
    sdgId: number;
    name: string;
}

export interface Category {
    categoryId: number;
    name: string;
}

export interface Booth {
    id: number;
    name: string;
    isAssigned: boolean;
    Store?: StoreType;
}
