import { useState } from "react";

export default function Register() {
    const [store, setStore] = useState({
        storeName: "",
        storeDescription: "",
    });

    const [loading, setLoading] = useState(false);
    const onCreate = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/stores/store", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(store),
            });
            const data = await response.json();
            console.log(data);
        } catch (error: any) {
            console.error("Error fetching session:", error);
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
                <label className="self-start" htmlFor="name">
                    Store name
                </label>
                <input
                    className="mb-2 w-full rounded-lg border-l-black px-4 py-2"
                    id="name"
                    type="text"
                    value={store.storeName}
                    onChange={(e) => setStore({ ...store, storeName: e.target.value })}
                    placeholder="store name"
                ></input>
                <label className="self-start" htmlFor="description">
                    Store description
                </label>
                <input
                    className="mb-4 w-full rounded-lg border-l-black px-4 py-2"
                    id="description"
                    type="text"
                    value={store.storeDescription}
                    onChange={(e) => setStore({ ...store, storeDescription: e.target.value })}
                    placeholder="store description"
                ></input>
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
