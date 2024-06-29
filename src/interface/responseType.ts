import { Sdg, StoreType, UserType } from "./dbType";

export interface defaultResponse {
    message: string;
    status: number;
}

export interface GetAllSdgsResponse extends defaultResponse {
    data: Sdg[];
}

export interface GetUserResponse extends defaultResponse {
    data: UserType;
}

// export interface GetStoreResponse extends defaultResponse {
//     data: StoreType & {
//         Sdg: Sdg[];
//         Member: UserType[];
//         inviting: UserType[];
//     };
// }

export interface GetUserWithStoreResponse extends defaultResponse {
    data: {
        User: UserType;
        Store?: StoreType & {
            Sdg: Sdg[];
            Member: UserType[];
            inviting: UserType[];
        };
    };
}
