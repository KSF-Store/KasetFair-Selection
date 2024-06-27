export interface User {
    userId: number;
    nisitId: string;
    role: string;
    name: string;
    faculty: string;
    year: number;
    address: string;
    phone: string;
    reservePhone1?: string;
    reservePhone2?: string;
    storeId?: number;
    Store?: Store;
  }
  
  export interface Store {
    storeId: number;
    storeRole: string;
    name: string;
    mainProductType: string;
    subProductType?: string;
    innovation?: string;
    status: number;  // 0 for draft, 1 for pending ...
    ownerId: number;
    Member?: User[];
    isAssigned: boolean;
    boothId?: number;
    Booth?: Booth;
  }
  
  export interface Booth {
    id: number;
    name: string;
    isAssigned: boolean;
    Store?: Store;
  }