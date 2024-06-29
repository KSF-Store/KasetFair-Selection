import { useEffect, useState } from "react";

import { UserType } from "@/interface/dbType";
import { SdgPayload, StorePayload } from "@/interface/payloadType";

import { SDGSList } from "@/utils/sdgs/sdgs";

import EditUserAndStore from "@/utils/api/stores/EditUserAndStore";

import { OnGettingStoreOfUser } from "@/server/connectToDb/GettingStoreOfUser";
import axios, { AxiosResponse } from "axios";
import {
    GetAllSdgsResponse,
    GetUserWithStoreResponse,
} from "@/interface/responseType";
import OnGetCurrentSession from "@/utils/getSession/getCurrentSession";

export default function StoreRegister() {
    const [user, setUser] = useState<UserType>({
        name: "",
        nisitId: "",
        faculty: "",
        year: 0,
        phone: "",
    });

    const [store, setStore] = useState<StorePayload>({
        name: "",
        description: "",
        slogan: "",
        mainProductType: "",
        subProductType: "",
        firstPhone: "",
        secondPhone: "",
        thirdPhone: "",
        innovation: "",
        invitingNisitId: [],
        sdgId: [],
    });

    const handleCheckboxChange = (id: number) => {
        setStore((prevStore) => {
            const newSdgId = prevStore.sdgId.includes(id)
                ? prevStore.sdgId.filter((sdgId) => sdgId !== id)
                : [...prevStore.sdgId, id];
            return { ...prevStore, sdgId: newSdgId };
        });
    };

    const [loading, setLoading] = useState(false);

    const onCreate = async () => {
        try {
            // console.log(process.env.NEXT_PUBLIC_TEST_USER_ID);
            // console.log(Number(process.env.NEXT_PUBLIC_TEST_USER_ID));
            setLoading(true);
            const response = await EditUserAndStore({
                User: user,
                Store: store,
            });
            console.log(response);
            // console.log(data);
        } catch (error) {
            console.error("Error creating store:", error);
        } finally {
            setLoading(false);
        }
        console.log("user : ", user);
        console.log("store : ", store);
    };

    const [sdgsList, setSdgsList] = useState<SdgPayload[]>();
    useEffect(() => {
        const getSdgsList = async () => {
            const response: AxiosResponse<GetAllSdgsResponse> = await axios.get(
                "/api/common/sdgs"
            );
            if (response.status == 200) {
                setSdgsList(response.data.data);
            }
        };
        getSdgsList();
    }, []);

    useEffect(() => {
        const retriveData = async () => {
            const email = (await OnGetCurrentSession()).user.email!;
            console.log(email);
            try {
                const response: AxiosResponse<GetUserWithStoreResponse> =
                    await axios.get(`/api/user/store/register`, {
                        params: { email },
                    });
                console.log(response);
                const retriveUser = response.data.data.User;
                const retriveStore = response.data.data.Store;
                console.log(retriveUser, retriveStore);
                if (retriveUser) {
                    setUser({
                        name: retriveUser.name ?? "",
                        nisitId: retriveUser.nisitId ?? "",
                        faculty: retriveUser.faculty ?? "",
                        year: retriveUser.year ?? 1,
                        phone: retriveUser.phone ?? "",
                    });
                }
                if (retriveStore) {
                    setStore({
                        ...store,
                        name: retriveStore.name ?? "",
                        description: retriveStore.description ?? "",

                        storeId: retriveStore.storeId ?? 0,
                        slogan: retriveStore.slogan ?? "",
                        mainProductType: retriveStore.mainProductType ?? "",
                        subProductType: retriveStore.subProductType ?? "",
                        firstPhone: retriveStore.firstPhone ?? "",
                        secondPhone: retriveStore.secondPhone ?? "",
                        thirdPhone: retriveStore.thirdPhone ?? "",
                        innovation: retriveStore.innovation ?? "",
                        invitingNisitId: retriveStore.inviting.map(
                            ({ nisitId }) => nisitId
                        ),
                        sdgId: retriveStore.Sdg.map(({ sdgId }) => sdgId),
                    });
                }
            } catch (error: any) {
                console.log(error);
            }
        };
        retriveData();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-10">
                <h1 className="text-2xl mb-4">Register Store</h1>
                <h2 className="text-xl mb-2">User Information</h2>
                <label className="self-start" htmlFor="name">
                    Name
                </label>
                <input
                    className="mb-2 w-full rounded-lg border px-4 py-2"
                    id="name"
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Name"
                />
                <label className="self-start" htmlFor="nisitId">
                    Nisit ID
                </label>
                <input
                    className="mb-2 w-full rounded-lg border px-4 py-2"
                    id="nisitId"
                    type="text"
                    value={user.nisitId}
                    onChange={(e) =>
                        setUser({ ...user, nisitId: e.target.value })
                    }
                    placeholder="Nisit ID"
                />
                <label className="self-start" htmlFor="faculty">
                    Faculty
                </label>
                <input
                    className="mb-2 w-full rounded-lg border px-4 py-2"
                    id="faculty"
                    type="text"
                    value={user.faculty}
                    onChange={(e) =>
                        setUser({ ...user, faculty: e.target.value })
                    }
                    placeholder="Faculty"
                />
                <label className="self-start" htmlFor="year">
                    Year
                </label>
                <select
                    className="mb-2 w-full rounded-lg border px-4 py-2"
                    id="year"
                    value={user.year}
                    onChange={(e) =>
                        setUser({ ...user, year: Number(e.target.value) })
                    }
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <label className="self-start" htmlFor="phone">
                    Phone
                </label>
                <input
                    className="mb-2 w-full rounded-lg border px-4 py-2"
                    id="phone"
                    type="text"
                    value={store.firstPhone}
                    onChange={(e) =>
                        setStore({ ...store, firstPhone: e.target.value })
                    }
                    placeholder="Phone"
                />
                <label className="self-start" htmlFor="reservePhone1">
                    Reserve Phone 1
                </label>
                <input
                    className="mb-2 w-full rounded-lg border px-4 py-2"
                    id="reservePhone1"
                    type="text"
                    value={store.secondPhone}
                    onChange={(e) =>
                        setStore({ ...store, secondPhone: e.target.value })
                    }
                    placeholder="Reserve Phone 1"
                />
                <label className="self-start" htmlFor="reservePhone2">
                    Reserve Phone 2
                </label>
                <input
                    className="mb-2 w-full rounded-lg border px-4 py-2"
                    id="reservePhone2"
                    type="text"
                    value={store.thirdPhone}
                    onChange={(e) =>
                        setStore({ ...store, thirdPhone: e.target.value })
                    }
                    placeholder="Reserve Phone 2"
                />
                <h2 className="text-xl mb-2">Store Information</h2>
                <label className="self-start" htmlFor="storeName">
                    Store Name
                </label>
                <input
                    className="mb-2 w-full rounded-lg border px-4 py-2"
                    id="storeName"
                    type="text"
                    value={store.name}
                    onChange={(e) =>
                        setStore({ ...store, name: e.target.value })
                    }
                    placeholder="Store Name"
                />
                <label className="self-start" htmlFor="mainProductType">
                    Main Product Type
                </label>
                <input
                    className="mb-2 w-full rounded-lg border px-4 py-2"
                    id="mainProductType"
                    type="text"
                    value={store.mainProductType}
                    onChange={(e) =>
                        setStore({ ...store, mainProductType: e.target.value })
                    }
                    placeholder="Main Product Type"
                />
                <label className="self-start" htmlFor="subProductType">
                    Sub Product Type
                </label>
                <input
                    className="mb-2 w-full rounded-lg border px-4 py-2"
                    id="subProductType"
                    type="text"
                    value={store.subProductType}
                    onChange={(e) =>
                        setStore({ ...store, subProductType: e.target.value })
                    }
                    placeholder="Sub Product Type"
                />
                <label className="self-start" htmlFor="innovation">
                    Innovation
                </label>
                <div className="mb-4">
                    {sdgsList &&
                        sdgsList.map((e) => (
                            <div
                                key={e.sdgId}
                                className="flex items-center mb-2"
                            >
                                <input
                                    type="checkbox"
                                    id={e.sdgId.toString()}
                                    checked={store.sdgId.includes(e.sdgId)}
                                    onChange={() =>
                                        handleCheckboxChange(e.sdgId)
                                    }
                                    className="mr-2"
                                />
                                <label htmlFor={e.sdgId.toString()}>
                                    {e.name}
                                </label>
                            </div>
                        ))}
                </div>
                <button
                    onClick={onCreate}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Create store
                </button>
            </div>
        </div>
    );
}
