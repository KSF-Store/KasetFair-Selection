import { useEffect, useState } from "react";

import { UserType } from "@/interface/dbType";
import { SdgPayload, StorePayload } from "@/interface/payloadType";

import EditUserAndStore from "@/utils/api/stores/EditUserAndStore";

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
            <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Register Store</h1>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">User Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="name"
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        placeholder="Name"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="nisitId">
                        Nisit ID
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="nisitId"
                        type="text"
                        value={user.nisitId}
                        onChange={(e) => setUser({ ...user, nisitId: e.target.value })}
                        placeholder="Nisit ID"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="faculty">
                        Faculty
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="faculty"
                        type="text"
                        value={user.faculty}
                        onChange={(e) => setUser({ ...user, faculty: e.target.value })}
                        placeholder="Faculty"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="year">
                        Year
                    </label>
                    <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="year"
                        value={user.year}
                        onChange={(e) => setUser({ ...user, year: Number(e.target.value) })}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="phone"
                        type="text"
                        value={store.firstPhone}
                        onChange={(e) => setStore({ ...store, firstPhone: e.target.value })}
                        placeholder="Phone"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="reservePhone1">
                        Reserve Phone 1
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="reservePhone1"
                        type="text"
                        value={store.secondPhone}
                        onChange={(e) => setStore({ ...store, secondPhone: e.target.value })}
                        placeholder="Reserve Phone 1"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="reservePhone2">
                        Reserve Phone 2
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="reservePhone2"
                        type="text"
                        value={store.thirdPhone}
                        onChange={(e) => setStore({ ...store, thirdPhone: e.target.value })}
                        placeholder="Reserve Phone 2"
                    />
                    </div>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Store Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="storeName">
                        Store Name
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="storeName"
                        type="text"
                        value={store.name}
                        onChange={(e) => setStore({ ...store, name: e.target.value })}
                        placeholder="Store Name"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="mainProductType">
                        Main Product Type
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="mainProductType"
                        type="text"
                        value={store.mainProductType}
                        onChange={(e) => setStore({ ...store, mainProductType: e.target.value })}
                        placeholder="Main Product Type"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="subProductType">
                        Sub Product Type
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="subProductType"
                        type="text"
                        value={store.subProductType}
                        onChange={(e) => setStore({ ...store, subProductType: e.target.value })}
                        placeholder="Sub Product Type"
                    />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Innovation</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sdgsList &&
                        sdgsList.map((e) => (
                        <div key={e.sdgId} className="flex items-center">
                            <input
                            type="checkbox"
                            id={e.sdgId.toString()}
                            checked={store.sdgId.includes(e.sdgId)}
                            onChange={() => handleCheckboxChange(e.sdgId)}
                            className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label htmlFor={e.sdgId.toString()} className="text-gray-700">
                            {e.name}
                            </label>
                        </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={onCreate}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Create store
                </button>
            </div>
      </div>
    )
}
