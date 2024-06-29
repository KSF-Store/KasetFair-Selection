'use client';

import React, { useEffect, useState } from 'react';
import { StoreType } from '@/interface/dbType';
import axios from 'axios';
import CategoryConfig from './categoryConfig';
import SdgConfig from './sdgConfig';
import StoreList from './storeList';

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
    <section className="flex min-h-screen">
      <aside className="w-1/4 bg-green-600 text-white p-4 min-h-screen">
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
        <StoreList/>
        <div className="mb-4"/>
        <SdgConfig/>
        <div className="mb-4"/>
        <CategoryConfig/>
      </main>
    </section>
  );
}