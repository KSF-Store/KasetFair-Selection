import axios from "axios";
import { useState } from "react";

import { SDGSList } from "@/utils/sdgs/sdgs";

import { UserType, StoreType } from "@/interface/dbType";
import { StorePayload } from "@/interface/payloadType";

import EditUserAndStore from "@/utils/api/stores/EditUserAndStore";

export default function StoreRegister() {
    const [user, setUser] = useState<UserType>({
        userId: 1000,
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
        primaryPhone: "",
        secondPhone: "",
        thirdPhone: "",
        innovation: "",
        invitingNisitId: [],
        sdgId: [],
    });

    const [loading, setLoading] = useState(false);

    const onCreate = async () => {
        try {
            console.log(process.env.NEXT_PUBLIC_TEST_USER_ID);
            console.log(Number(process.env.NEXT_PUBLIC_TEST_USER_ID));
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
                    value={store.primaryPhone}
                    onChange={(e) =>
                        setStore({ ...store, primaryPhone: e.target.value })
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
                    {SDGSList.map((e) => (
                        <div key={e.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={e.id.toString()}
                                // checked={store.innovation.includes(innovation)}
                                onChange={() => {
                                    store.sdgId.push(e.id);
                                }}
                                className="mr-2"
                            />
                            <label>{e.name}</label>
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
