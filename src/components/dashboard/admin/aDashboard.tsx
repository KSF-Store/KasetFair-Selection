'use client'

import React, { useEffect, useState } from 'react'

import type { NisitStore  as StoreType } from "@prisma/client";

import Link from 'next/link';

type StoresRenderType = {
    stores: StoreType[],
    isLoading: boolean,
    isError: boolean
  }

export default function AdminDashboard() {
    const [storesRender , onSetStoreRender] = useState<StoresRenderType>({
      stores : [],
      isLoading : false,
      isError : false
    })
    
    const onGetStores = async ()=>{
      const response = await fetch("/api/stores/route",{
        method:"GET"
      });
      const data = await response.json();
      onSetStoreRender({...storesRender,stores:data.data});
    }
    
    useEffect(()=>{
      try{
        onSetStoreRender({
          ...storesRender,
          isLoading:true
        });
        onGetStores();
      }catch(error: any){
        console.log(error);
      }finally{
        onSetStoreRender({
          ...storesRender,
          isLoading:false
        })
      }
    },[])

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
            {storesRender.isLoading ?? <>Loading ... </>}
            {
              storesRender.isError ?? <>Failed to load stores</>
            }
            {
              storesRender.stores.length ? (
                <ul>
                  {storesRender.stores.map(store => (
                    // creating component render this field laters 
                    <li key={store.id} className="mb-2 p-2 border-b">
                      <div>
                        <h3 className="font-bold">Store name : {store.storeName}</h3>
                        <p>Store description : {store.storeDescription}</p>                          
                      </div>
                      <button>
                        <Link href={''}/>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>ไม่มีข้อมูล ณ ขณะนี้</p>
              )
            }
          </div>
        </main>
      </section>
    )
}