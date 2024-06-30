import { useEffect, useState } from "react";

import { Sdg, UserType, StoreType } from "@/interface/dbType";
import { SdgPayload, StorePayload, UserPayload } from "@/interface/payloadType";
import { defaultResponse } from "@/interface/responseType";
import { getUserAndStore } from "@/server/connectToDb/GettingStoreOfUser";
import {
    GetAllSdgsResponse,
    GetUserWithStoreResponse,
} from "@/interface/responseType";
import { createEditStore } from "@/server/connectToDb/CreateAndEditStore";
import { getAllSdgs } from "@/server/connectToDb/Sdg";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    User: Omit<UserPayload, "Store">;
    Store: StorePayload;
};

export interface InitData extends Omit<defaultResponse, "message"> {
    User: UserType;
    Store?:
        | (StoreType & {
              Sdg: Sdg[];
              Member: UserType[];
              inviting: UserType[];
          })
        | null;
}

export default function StoreRegister() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const [loading, setLoading] = useState<boolean>(false);
    const [sdgsList, setSdgsList] = useState<Sdg[]>();
    const [initData, setInitData] = useState<InitData>();

    useEffect(() => {
        const getSdgsList = async () => {
            const response = await getAllSdgs();
            if (response.data) {
                setSdgsList(response.data);
            }
        };
        getSdgsList();
    }, []);

    useEffect(() => {
        const retriveData = async () => {
            try {
                const response = await getUserAndStore();
                const retrievedUser = response.data.User;
                const retrievedStore = response.data.Store;

                if (retrievedUser) {
                    const updatedData: InitData = {
                        User: retrievedUser,
                        Store: retrievedStore
                            ? {
                                  ...retrievedStore,
                                  Sdg: retrievedStore.Sdg || [],
                                  Member: retrievedStore.Member || [],
                                  inviting: retrievedStore.inviting || [],
                              }
                            : null,
                    };
                    setInitData(updatedData);
                }
            } catch (error: any) {
                console.log(error);
            }
        };
        retriveData();
    }, []);
    console.log(watch("Store.sdgId"));
    console.log(watch("Store.firstPhone"));
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setLoading(true);
            const response = await createEditStore({
                User: data.User,
                Store: data.Store,
            });
            console.log(response);
        } catch (error) {
            console.error("Error creating store:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (sdgId: number) => {
        const isChecked =
            (initData?.Store?.Sdg || []).findIndex(
                (sdg) => sdg.sdgId === sdgId
            ) !== -1;

        if (isChecked) {
            // Remove SDG from selected list
            const updatedSdgs = (initData?.Store?.Sdg || []).filter(
                (sdg) => sdg.sdgId !== sdgId
            );
            setInitData(
                (prevData) =>
                    prevData && {
                        ...prevData,
                        Store: {
                            ...prevData.Store!,
                            Sdg: updatedSdgs,
                        },
                    }
            );
        } else {
            // Add SDG to selected list
            const selectedSdg =
                sdgsList && sdgsList.find((sdg) => sdg.sdgId === sdgId);
            if (selectedSdg) {
                setInitData(
                    (prevData) =>
                        prevData && {
                            ...prevData,
                            Store: {
                                ...prevData.Store!,
                                Sdg: [
                                    ...(prevData.Store?.Sdg || []),
                                    selectedSdg,
                                ],
                            },
                        }
                );
            }
        }
    };

    const [invitingNisitIdFields, setInvitingNisitIdFields] = useState<
        string[]
    >((initData?.Store?.inviting || []).map(({ nisitId }) => nisitId || ""));

    const addInvitingField = () => {
        setInvitingNisitIdFields([...invitingNisitIdFields, ""]);
    };

    const removeInvitingField = (index: number) => {
        const updatedFields = [...invitingNisitIdFields];
        updatedFields.splice(index, 1);
        setInvitingNisitIdFields(updatedFields);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto bg-green-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Prefix
                </label>
                <input
                    defaultValue={initData?.User.prefix || ""}
                    {...register("User.prefix")}
                    placeholder="Prefix"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                </label>
                <input
                    defaultValue={initData?.User.name || ""}
                    {...register("User.name")}
                    placeholder="Name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    NisitId
                </label>
                <input
                    defaultValue={initData?.User.nisitId || ""}
                    {...register("User.nisitId")}
                    placeholder="NisitId"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Faculty
                </label>
                <input
                    defaultValue={initData?.User.faculty || ""}
                    {...register("User.faculty")}
                    placeholder="Faculty"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Year
                </label>
                <input
                    defaultValue={initData?.User.year || ""}
                    {...register("User.year")}
                    placeholder="Year"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Store name
                </label>
                <input
                    defaultValue={
                        (initData?.Store && initData?.Store.name) || ""
                    }
                    {...register("Store.name")}
                    placeholder="Store name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                </label>
                <input
                    defaultValue={
                        (initData?.Store && initData?.Store.description) || ""
                    }
                    {...register("Store.description")}
                    placeholder="Description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Main Product Type
                </label>
                <select
                    defaultValue={
                        (initData?.Store && initData?.Store.mainProductType) ||
                        ""
                    }
                    {...register("Store.mainProductType")}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                >
                    <option value={1}>Product Type 1</option>
                    <option value={2}>Product Type 2</option>
                    <option value={3}>Product Type 3</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Sub Product Type
                </label>
                <input
                    defaultValue={
                        (initData?.Store && initData?.Store.subProductType) ||
                        ""
                    }
                    {...register("Store.subProductType")}
                    placeholder="Sub Product Type"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select SDGs
                </label>
                {sdgsList &&
                    sdgsList.map((option) => (
                        <div key={option.sdgId} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`sdg-${option.sdgId}`}
                                checked={(initData?.Store?.Sdg || []).some(
                                    (sdg) => sdg.sdgId === option.sdgId
                                )}
                                onChange={() =>
                                    handleCheckboxChange(option.sdgId)
                                }
                                className="form-checkbox h-4 w-4 text-green-600 focus:outline-none focus:shadow-outline"
                            />
                            <label
                                htmlFor={`sdg-${option.sdgId}`}
                                className="ml-2 text-gray-700"
                            >
                                {option.name}
                            </label>
                        </div>
                    ))}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Inviting NisitId
                </label>
                {invitingNisitIdFields.map((nisitId, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={nisitId}
                            onChange={(e) => {
                                const updatedFields = [
                                    ...invitingNisitIdFields,
                                ];
                                updatedFields[index] = e.target.value;
                                setInvitingNisitIdFields(updatedFields);
                            }}
                            className="form-input w-full"
                        />
                        {index === 0 && (
                            <button
                                type="button"
                                onClick={addInvitingField}
                                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Add
                            </button>
                        )}
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeInvitingField(index)}
                                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Create/Edit
                </button>
            </div>
        </form>
    );
}
//     const [user, setUser] = useState<UserType>({
//         name: "",
//         faculty: "",
//         year: 0,
//         phone: "",
//     });

//     const [store, setStore] = useState<StorePayload>({
//         name: "",
//         description: "",
//         slogan: "",
//         mainProductType: "",
//         subProductType: "",
//         firstPhone: "",
//         secondPhone: "",
//         thirdPhone: "",
//         innovation: "",
//         invitingNisitId: [],
//         sdgId: [],
//     });

//     const handleCheckboxChange = (id: number) => {
//         setStore((prevStore) => {
//             const newSdgId =
//                 prevStore.sdgId && prevStore.sdgId.includes(id)
//                     ? prevStore.sdgId.filter((sdgId) => sdgId !== id)
//                     : [...prevStore.sdgId, id];
//             return { ...prevStore, sdgId: newSdgId };
//         });
//     };

//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const retriveData = async () => {
//             try {
//                 const response = await getUserAndStore();
//                 // console.log(response);
//                 const retriveUser = response.data.User;
//                 const retriveStore = response.data.Store;
//                 console.log(retriveUser, retriveStore);
//                 if (retriveUser) {
//                     setUser({
//                         name: retriveUser.name ?? "",
//                         nisitId: retriveUser.nisitId ?? null,
//                         faculty: retriveUser.faculty ?? "",
//                         year: retriveUser.year ?? 1,
//                         phone: retriveUser.phone ?? "",
//                     });
//                 }
//                 if (retriveStore) {
//                     setStore({
//                         ...store,
//                         name: retriveStore.name ?? "",
//                         description: retriveStore.description ?? "",

//                         storeId: retriveStore.storeId ?? 0,
//                         slogan: retriveStore.slogan ?? "",
//                         mainProductType: retriveStore.mainProductType ?? "",
//                         subProductType: retriveStore.subProductType ?? "",
//                         firstPhone: retriveStore.firstPhone ?? "",
//                         secondPhone: retriveStore.secondPhone ?? "",
//                         thirdPhone: retriveStore.thirdPhone ?? "",
//                         innovation: retriveStore.innovation ?? "",
//                         invitingNisitId: retriveStore.inviting
//                             .map(({ nisitId }) => nisitId)
//                             .filter(
//                                 (nisitId): nisitId is string =>
//                                     nisitId !== null && nisitId !== undefined
//                             ),
//                         sdgId: retriveStore.Sdg.map(({ sdgId }) => sdgId),
//                     });
//                 }
//             } catch (error: any) {
//                 console.log(error);
//             }
//         };
//         retriveData();
//     }, []);

//     if (loading) {
//         return <h1>Loading...</h1>;
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white shadow-lg rounded-lg p-10">
//                 <h1 className="text-2xl mb-4">Register Store</h1>
//                 <h2 className="text-xl mb-2">User Information</h2>
//                 <label className="self-start" htmlFor="name">
//                     Name
//                 </label>
//                 <input
//                     className="mb-2 w-full rounded-lg border px-4 py-2"
//                     id="name"
//                     type="text"
//                     value={user.name ?? ""}
//                     onChange={(e) => setUser({ ...user, name: e.target.value })}
//                     placeholder="Name"
//                 />
//                 <label className="self-start" htmlFor="nisitId">
//                     Nisit ID
//                 </label>
//                 <input
//                     className="mb-2 w-full rounded-lg border px-4 py-2"
//                     id="nisitId"
//                     type="text"
//                     value={user.nisitId ?? ""}
//                     onChange={(e) =>
//                         setUser({ ...user, nisitId: e.target.value })
//                     }
//                     placeholder="Nisit ID"
//                 />
//                 <label className="self-start" htmlFor="faculty">
//                     Faculty
//                 </label>
//                 <input
//                     className="mb-2 w-full rounded-lg border px-4 py-2"
//                     id="faculty"
//                     type="text"
//                     value={user.faculty ?? ""}
//                     onChange={(e) =>
//                         setUser({ ...user, faculty: e.target.value })
//                     }
//                     placeholder="Faculty"
//                 />
//                 <label className="self-start" htmlFor="year">
//                     Year
//                 </label>
//                 <select
//                     className="mb-2 w-full rounded-lg border px-4 py-2"
//                     id="year"
//                     value={user.year ?? ""}
//                     onChange={(e) =>
//                         setUser({ ...user, year: Number(e.target.value) })
//                     }
//                 >
//                     <option value={1}>1</option>
//                     <option value={2}>2</option>
//                     <option value={3}>3</option>
//                     <option value={4}>4</option>
//                     <option value={5}>5</option>
//                 </select>
//                 <label className="self-start" htmlFor="phone">
//                     Phone
//                 </label>
//                 <input
//                     className="mb-2 w-full rounded-lg border px-4 py-2"
//                     id="phone"
//                     type="text"
//                     value={store.firstPhone ?? ""}
//                     onChange={(e) =>
//                         setStore({ ...store, firstPhone: e.target.value })
//                     }
//                     placeholder="Phone"
//                 />
//                 <label className="self-start" htmlFor="reservePhone1">
//                     Reserve Phone 1
//                 </label>
//                 <input
//                     className="mb-2 w-full rounded-lg border px-4 py-2"
//                     id="reservePhone1"
//                     type="text"
//                     value={store.secondPhone ?? ""}
//                     onChange={(e) =>
//                         setStore({ ...store, secondPhone: e.target.value })
//                     }
//                     placeholder="Reserve Phone 1"
//                 />
//                 <label className="self-start" htmlFor="reservePhone2">
//                     Reserve Phone 2
//                 </label>
//                 <input
//                     className="mb-2 w-full rounded-lg border px-4 py-2"
//                     id="reservePhone2"
//                     type="text"
//                     value={store.thirdPhone ?? ""}
//                     onChange={(e) =>
//                         setStore({ ...store, thirdPhone: e.target.value })
//                     }
//                     placeholder="Reserve Phone 2"
//                 />
//                 <h2 className="text-xl mb-2">Store Information</h2>
//                 <label className="self-start" htmlFor="storeName">
//                     Store Name
//                 </label>
//                 <input
//                     className="mb-2 w-full rounded-lg border px-4 py-2"
//                     id="storeName"
//                     type="text"
//                     value={store.name ?? ""}
//                     onChange={(e) =>
//                         setStore({ ...store, name: e.target.value })
//                     }
//                     placeholder="Store Name"
//                 />
//                 <label className="self-start" htmlFor="mainProductType">
//                     Main Product Type
//                 </label>
//                 <input
//                     className="mb-2 w-full rounded-lg border px-4 py-2"
//                     id="mainProductType"
//                     type="text"
//                     value={store.mainProductType ?? ""}
//                     onChange={(e) =>
//                         setStore({ ...store, mainProductType: e.target.value })
//                     }
//                     placeholder="Main Product Type"
//                 />
//                 <label className="self-start" htmlFor="subProductType">
//                     Sub Product Type
//                 </label>
//                 <input
//                     className="mb-2 w-full rounded-lg border px-4 py-2"
//                     id="subProductType"
//                     type="text"
//                     value={store.subProductType ?? ""}
//                     onChange={(e) =>
//                         setStore({ ...store, subProductType: e.target.value })
//                     }
//                     placeholder="Sub Product Type"
//                 />
//                 <label className="self-start" htmlFor="innovation">
//                     Innovation
//                 </label>
//                 <div className="mb-4">
//                     {sdgsList &&
//                         sdgsList.map((e) => (
//                             <div
//                                 key={e.sdgId}
//                                 className="flex items-center mb-2"
//                             >
//                                 <input
//                                     type="checkbox"
//                                     id={e.sdgId.toString()}
//                                     checked={store.sdgId.includes(e.sdgId)}
//                                     onChange={() =>
//                                         handleCheckboxChange(e.sdgId)
//                                     }
//                                     className="mr-2"
//                                 />
//                                 <label htmlFor={e.sdgId.toString()}>
//                                     {e.name}
//                                 </label>
//                             </div>
//                         ))}
//                 </div>
//                 <button
//                     onClick={onCreate}
//                     className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
//                 >
//                     Create store
//                 </button>
//             </div>
//         </div>
//     );
// }
