'use client';

import React, { useEffect, useState } from 'react';
import { StoreType } from '@/interface/dbType';
import Link from 'next/link';

type StoresRenderType = {
  stores: StoreType[],
  isLoading: boolean,
  isError: boolean
}

export default function AdminDashboard() {
  const [storesRender, onSetStoreRender] = useState<StoresRenderType>({
    stores: [],
    isLoading: false,
    isError: false
  });

  const onGetStores = async () => {
    try {
      const response = await fetch("/api/stores/route", {
        method: "GET"
      });
      const data = await response.json();
      onSetStoreRender({ ...storesRender, stores: data.data, isLoading: false });
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
    <section className="flex h-screen">
      <aside className="w-1/4 bg-green-600 text-white p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">KSF</h1>
          <p>Kaset Fair Selection</p>
        </div>
        <nav>
          <ul>
            <li className="mb-2"><a href="#" className="text-white">หน้าหลัก</a></li>
            <li className="mb-2"><a href="#" className="text-white">ประกาศ</a></li>
          </ul>
        </nav>
      </aside>
      <main className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">Stores List</h2>
        <div className="bg-white p-4 shadow rounded">
          {storesRender.isLoading && <p>Loading ... </p>}
          {storesRender.isError && <p>Failed to load stores</p>}
          {storesRender.stores.length ? (
            <ul>
              {storesRender.stores.map(store => (
                <li key={store.storeId} className="mb-2 p-2 border-b">
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
                    <Link href={`/store/${store.storeId}`}>
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
      </main>
    </section>
  );
}