import axios from "axios";
import { useState } from "react";

export default function Register() {
    const [store, setStore] = useState({
        storeRole: "",
        name: "",
        mainProductType: "",
        subProductType: "",
        innovation: "",
        ownerId: "", // You might want to handle this differently depending on your authentication setup
    });

    const [loading, setLoading] = useState(false);

    const onCreate = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/user/form/store", store);
            const data = response.data;
            console.log(data);
        } catch (error: any) {
            console.error("Error creating store:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-10">
                <label className="self-start" htmlFor="storeRole">
                    Store Role
                </label>
                <input
                    className="mb-2 w-full rounded-lg border-l-black px-4 py-2"
                    id="storeRole"
                    type="text"
                    value={store.storeRole}
                    onChange={(e) =>
                        setStore({ ...store, storeRole: e.target.value })
                    }
                    placeholder="Store role"
                />
                <label className="self-start" htmlFor="name">
                    Store Name
                </label>
                <input
                    className="mb-2 w-full rounded-lg border-l-black px-4 py-2"
                    id="name"
                    type="text"
                    value={store.name}
                    onChange={(e) =>
                        setStore({ ...store, name: e.target.value })
                    }
                    placeholder="Store name"
                />
                <label className="self-start" htmlFor="mainProductType">
                    Main Product Type
                </label>
                <input
                    className="mb-2 w-full rounded-lg border-l-black px-4 py-2"
                    id="mainProductType"
                    type="text"
                    value={store.mainProductType}
                    onChange={(e) =>
                        setStore({ ...store, mainProductType: e.target.value })
                    }
                    placeholder="Main product type"
                />
                <label className="self-start" htmlFor="subProductType">
                    Sub Product Type
                </label>
                <input
                    className="mb-2 w-full rounded-lg border-l-black px-4 py-2"
                    id="subProductType"
                    type="text"
                    value={store.subProductType}
                    onChange={(e) =>
                        setStore({ ...store, subProductType: e.target.value })
                    }
                    placeholder="Sub product type"
                />
                <label className="self-start" htmlFor="innovation">
                    Innovation
                </label>
                <input
                    className="mb-4 w-full rounded-lg border-l-black px-4 py-2"
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
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Create store
                </button>
            </div>
        </div>
    );
}
