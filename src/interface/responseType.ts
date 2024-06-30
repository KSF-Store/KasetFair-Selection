import { Sdg, StoreType, UserType } from "./dbType";

export interface defaultResponse {
    message: string;
}

export interface GetAllSdgsResponse extends defaultResponse {
    data: Sdg[] | null;
}

export interface GetUserResponse extends defaultResponse {
    data: UserType | null;
}

export interface CreateEditStoreResponse extends defaultResponse {
    data: StoreType | null;
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
        Store?:
            | (StoreType & {
                  Sdg: Sdg[];
                  Member: UserType[];
                  inviting: UserType[];
              })
            | null;
    };
}
export interface UpdateUserResponse extends defaultResponse {
    data: UserType;
}
