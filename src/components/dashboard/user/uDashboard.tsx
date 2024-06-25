'use client'
import React, { useEffect, useState } from 'react'

import OnGetCurrentSession from '@/utils/getSession/getCurrentSession'

import { NisitType , NisitStoreType } from '@/interface/dbType'

type DashboardRenderType = {
    nisit?: NisitType,
    store?: NisitStoreType,
    isLoading: boolean,
    isError: boolean
}

export default function UserDashboard() {
    const [dashboard,onSetDashboardRender] = useState<DashboardRenderType>({
        nisit: undefined,
        store: undefined,
        isLoading: false,
        isError: false
    })

    const onGetDashboard = async ()=>{
        const user = (await OnGetCurrentSession()).user  
        const response = await fetch(`/api/stores/${user.email}/route`,{
            method: 'GET'
        })
        const data : NisitType & NisitStoreType = await response.json()
        onSetDashboardRender({
          ...dashboard,
          nisit: {
            id :  data.id,
            nisitId: data.nisitId,
            email: data.email,
            name: data.name,
            role: data.role,
            // image: data.image,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
          store: {
            id: data.id,
            nisitId: data.nisitId,
            storeName: data.storeName,
            nisitModelId : data.nisitModelId, 
            storeDescription: data.storeDescription,
            // storeImage: data.storeImage,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            BoothId: data.BoothId,
          },
        })
    }

    useEffect(()=>{
        try{
            onSetDashboardRender({
                ...dashboard,
                isLoading:true
            })
            onGetDashboard()
        }catch(error: any){
            console.log(error)
        }finally{
            onSetDashboardRender({
                ...dashboard,
                isLoading:false
            })
        }
    },[])

    return (
      <section className="flex h-screen">
        <aside className="w-1/4 bg-gray-800 text-white p-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">KSF</h1>
            <p>Kaset Fair Selection</p>
          </div>
          <nav>
            <ul>
              <li className="mb-2"><a href="#" className="text-white">หน้าหลัก</a></li>
              <li className="mb-2"><a href="#" className="text-white">My Store</a></li>
              <li className="mb-2"><a href="#" className="text-white">ประกาศ</a></li>
            </ul>
          </nav>
        </aside>
        <main className="w-3/4 p-4">
          <h2 className="text-xl font-bold mb-4">My Store Details</h2>
          <div className="bg-white p-4 shadow rounded">
            {dashboard.isLoading ? (
              <p>Loading...</p>
            ) : dashboard.isError ? (
              <p>Failed to load store details</p>
            ) : dashboard.store && dashboard.nisit ? (
              <div>
                <h3 className="font-bold text-2xl mb-2">{dashboard.store.storeName}</h3>
                <p className="text-gray-700 mb-2">{dashboard.store.storeDescription}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-4 rounded shadow">
                    <h4 className="font-bold">Store Details</h4>
                    <p>ID: {dashboard.store.id}</p>
                    <p>Owner ID: {dashboard.store.nisitId}</p>
                    <p>Booth ID: {dashboard.store.BoothId}</p>
                    <p>Created At: {new Date(dashboard.store.createdAt).toLocaleString()}</p>
                    <p>Updated At: {new Date(dashboard.store.updatedAt).toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded shadow">
                    <h4 className="font-bold">Owner Details</h4>
                    <p>Name: {dashboard.nisit.name}</p>
                    <p>Email: {dashboard.nisit.email}</p>
                    <p>Role: {dashboard.nisit.role}</p>
                    <p>Created At: {new Date(dashboard.nisit.createdAt).toLocaleString()}</p>
                    <p>Updated At: {new Date(dashboard.nisit.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p>ไม่มีข้อมูล ณ ขณะนี้</p>
            )}
          </div>
        </main>
      </section>
    )
}