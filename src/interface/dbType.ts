export interface UserType {
    userId?: number;
    nisitId: string;
    role?: string;
    name: string;
    faculty?: string;
    year?: number;
    address?: string;
    phone?: string;
    storeId?: number;
    Store?: StoreType;
    invited?: StoreType[];
}

export interface StoreType {
    storeId?: number;
    storeRole?: string;
    name?: string;
    description?: string;
    slogan?: string;
    mainProductType: string;
    subProductType?: string;
    innovation?: string;
    firstPhone?: string;
    secondPhone?: string;
    thirdPhone?: string;
    status?: StoreStatus; // 0 for draft, 1 for pending ...
    ownerId?: number;
    Member?: UserType[];
    isAssigned?: boolean;
    boothId?: number;
    Booth?: Booth;
    Sdg?: Sdg[];
    inviting?: UserType[];
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
