'use client'

import React, { useEffect , useState } from 'react'

import { OnGettingStoreOfUser } from '@/server/connectToDb/GettingStoreOfUser'

import { UserType } from '@/interface/dbType';
import { StorePayload } from '@/interface/payloadType';

type Props = {}

export default function UserDashboard({}: Props) {

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

  useEffect(()=>{
    const gettingUser = async ()=>{
      const response = await OnGettingStoreOfUser()

      setUser({
        name: response.name ?? "",
        nisitId: response.nisitId ?? "",
        faculty: response.faculty ?? "",
        year: response.year ?? 1,
        phone: response.phone ?? "",
    });
    console.log("response : ", response)
    const retriveStore = response.Store

    setStore({
        ...store,
        name: response?.Store?.name ?? "",
        description: retriveStore?.description ?? "",
        storeId: retriveStore?.storeId ?? 0,
        slogan: retriveStore?.slogan ?? "",
        mainProductType: retriveStore?.mainProductType ?? "",
        subProductType: retriveStore?.subProductType ?? "",
        firstPhone: retriveStore?.firstPhone ?? "",
        secondPhone: retriveStore?.secondPhone ?? "",
        thirdPhone: retriveStore?.thirdPhone ?? "",
        innovation: retriveStore?.innovation ?? "",
        status: retriveStore?.status ?? 0,
        storeRole: retriveStore?.storeRole ?? "",
        sdgId: retriveStore?.Sdg.map(({ sdgId }) => sdgId) ?? [],
        // invitingNisitId: retriveStore?.inviting.map(({ nisitId }) => nisitId) ?? [],

        // invitingNisitId: response?. inviting.map(
        //     ({ nisitId }) => nisitId
        // ),
        // sdgId: retriveStore.Sdg.map(({ sdgId }) => sdgId),  
    })

    }
    gettingUser()
  },[])

  return (
    <section>
      <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nisit ID</label>
                <input
                  type="text"
                  value={user.nisitId}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Faculty</label>
                <input
                  type="text"
                  value={user.faculty}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="text"
                  value={user.year}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  value={user.phone}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold mt-10 mb-6">Store Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Store Name</label>
                <input
                  type="text"
                  value={store.name}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={store.description}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Slogan</label>
                <input
                  type="text"
                  value={store.slogan}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Main Product Type</label>
                <input
                  type="text"
                  value={store.mainProductType}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sub Product Type</label>
                <input
                  type="text"
                  value={store.subProductType}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">First Phone</label>
                <input
                  type="text"
                  value={store.firstPhone}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Second Phone</label>
                <input
                  type="text"
                  value={store.secondPhone}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Third Phone</label>
                <input
                  type="text"
                  value={store.thirdPhone}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Innovation</label>
                <input
                  type="text"
                  value={store.innovation}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Inviting Nisit IDs</label>
                <input
                  type="text"
                  // value={store.invitingNisitId.join(', ')}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">SDG IDs</label>
                <input
                  type="text"
                  value={store.sdgId.join(', ')}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>
  
    </section>
  )
}