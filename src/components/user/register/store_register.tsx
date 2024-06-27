import axios from "axios";
import { useState } from "react";

import { UserType, StoreType } from "@/interface/dbType";
import { StorePayload } from "@/interface/payloadType";

import EditStore from "@/utils/api/stores/EditStore";

export default function StoreRegister() {
    const [user, setUser] = useState<UserType>({
        userId: 1,
        name: "",
        nisitId: "",
        faculty: "",
        year: 0,
        phone: "",
        reservePhone1: "",
        reservePhone2: "",
    });

    const [store, setStore] = useState<StorePayload>({
        name: "",
        description: "",
        slogan: "",
        mainProductType: "",
        subProductType: "",
        innovation: "",
        invitingNisitId: [],
        sdgId: [1, 2, 3],
    });

    const [loading, setLoading] = useState(false);

    const onCreate = async () => {
        try {
            setLoading(true);
            const response = EditStore({ User: user, Store: store });
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
                    value={user.phone}
                    onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
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
                    value={user.reservePhone1}
                    onChange={(e) =>
                        setUser({ ...user, reservePhone1: e.target.value })
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
                    value={user.reservePhone2}
                    onChange={(e) =>
                        setUser({ ...user, reservePhone2: e.target.value })
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
                <input
                    className="mb-4 w-full rounded-lg border px-4 py-2"
                    id="innovation"
                    type="text"
                    value={store.innovation}
                    onChange={(e) =>
                        setStore({ ...store, innovation: e.target.value })
                    }
                    placeholder="Innovation"
                />
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
