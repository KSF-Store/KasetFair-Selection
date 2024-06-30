'use client'
import { useState, useEffect } from "react";

import axios from "axios";

import { StoreType } from "@/interface/dbType";

import Link from "next/link";

type StoresRenderType = {
    stores: StoreType[],
    isLoading: boolean,
    isError: boolean
}

export default function StoreList() {
    const [storesRender, onSetStoreRender] = useState<StoresRenderType>({
        stores: [],
        isLoading: false,
        isError: false
      });
    
      const onGetStores = async () => {
        try {
          const response = await axios.get("/api/admin/stores");
          console.log(response.data.data);
          onSetStoreRender({ ...storesRender, stores: response.data.data, isLoading: false });
        } catch (error: any) {
          console.log(error);
          onSetStoreRender({ ...storesRender, isError: true, isLoading: false });
        }
      }
    
      useEffect(() => {
        onSetStoreRender({ ...storesRender, isLoading: true });
        onGetStores();
      }, []);
      return (
        <section>
            <h2 className="text-xl font-bold mb-4">Stores List</h2>
            <div className="bg-white p-4 shadow rounded">
            {storesRender.isLoading && <p>Loading ... </p>}
            {storesRender.isError && <p>Failed to load stores</p>}
            {storesRender.stores.length ? (
                <ul className="flex flex-col gap-y-[5vh]">
                {storesRender.stores.map(store => (
                    <li key={store.storeId} className="border-b-2 py-[2vh]">
                      <div>
                          <h3 className="font-bold">Store Name: {store.name}</h3>
                          <p><strong>Description:</strong> {store.description}</p>
                          <p><strong>Slogan:</strong> {store.slogan}</p>
                          <p><strong>Main Product Type:</strong> {store.mainProductType}</p>
                          <p><strong>Sub Product Type:</strong> {store.subProductType}</p>
                          <p><strong>Innovation:</strong> {store.innovation}</p>
                          <p><strong>First Phone:</strong> {store.firstPhone}</p>
                          <p><strong>Second Phone:</strong> {store.secondPhone}</p>
                          <p><strong>Third Phone:</strong> {store.thirdPhone}</p>
                          <p><strong>Status:</strong> {store.status === 0 ? 'Draft' : store.status === 1 ? 'Pending' : 'Unknown'}</p>
                          <p><strong>Owner ID:</strong> {store.ownerId}</p>
                          <p><strong>Assigned Booth:</strong> {store.boothId}</p>
                          <p><strong>SDGs:</strong> {store.Sdg?.map(sdg => sdg.name).join(', ')}</p>
                      </div>
                      <button className="mt-2 bg-blue-500 text-white p-2 rounded">
                          <Link href={`/super-admin/${store.storeId}`}>
                          View Details
                          </Link>
                      </button>
                    </li>
                ))}
                </ul>
            ) : (
                <p>No data available at this moment.</p>
            )}
            </div>
        </section>
      );
}