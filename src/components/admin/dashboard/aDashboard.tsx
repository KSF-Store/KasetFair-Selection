'use client';

import React, { useEffect, useState } from 'react';
import { StoreType, Sdg } from '@/interface/dbType';
import Link from 'next/link';
import axios from 'axios';
import { SdgPayload } from '@/interface/payloadType';

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
  const [sdgs, setSdgs] = useState<Sdg[]>([]);
  const [sdgId, setSdgId] = useState<number | string>('');
  const [name, setName] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddSdg = async () => {
    if (sdgId && name) {
      const newSdg: SdgPayload = { sdgId: Number(sdgId), name };
      await onAddSDG(newSdg);
    } else {
      alert("Please provide both SDG ID and Name.");
    }
  }

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

  const onGetSdgs = async () => {
    try {
      const response = await axios.get("/api/admin/sdgs");
      setSdgs(response.data);
    } catch (error: any) {
      console.log(error);
      setErrorMessage("Failed to load SDGs.");
    }
  }

  const onAddSDG = async (sdg: SdgPayload) => {
    try {
      const response = await axios.post("/api/admin/sdgs", sdg);
      console.log("SDG added:", response.data);
      setErrorMessage('');
      setSuccessMessage('SDG added successfully!');
      onGetSdgs(); // Refresh SDG list
    } catch (error: any) {
      setSuccessMessage('');
      if (error.response && error.response.status === 409) {
        setErrorMessage("SDG ID already exists. Please choose a different ID.");
      } else {
        console.log(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  }


  const onDeleteSDG = async (sdgId: string) => {
    try {
      const response = await axios.delete(`/api/admin/sdgs/${sdgId}`);
      console.log("SDG deleted:", response.data);
      setSuccessMessage('SDG deleted successfully!');
      onGetSdgs();
    } catch (error: any) {
      console.log(error);
      setErrorMessage("Failed to delete SDG.");
    }
  }

  useEffect(() => {
    onSetStoreRender({ ...storesRender, isLoading: true });
    onGetStores();
    onGetSdgs();
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
        <div className="mt-4 bg-white p-4 shadow rounded">
          <h3 className="text-lg font-bold mb-2">SDG List</h3>
          {sdgs.length > 0 && (
            <ul>
              {sdgs.map(sdg => (
                <li key={sdg.sdgId} className="mb-2 p-2 border-b flex justify-between items-center">
                  <div className="m-2">
                    <p><strong>SDG ID:</strong> {sdg.sdgId}</p>
                    <p><strong>Name:</strong> {sdg.name}</p>
                  </div>
                  <div>
                    <button
                      className="bg-red-500 text-white p-2 rounded"
                      onClick={() => onDeleteSDG(String(sdg.sdgId))}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {sdgs.length === 0 && (
            <p>No SDGs available at this moment.</p>
          )}
        </div>
        <div className="mt-4 bg-white p-4 shadow rounded">
          <h3 className="text-lg font-bold mb-2">Add/Edit SDG</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddSdg(); }}>
            <div className="mb-2">
              <label className="block text-gray-700">SDG ID:</label>
              <input
                type="number"
                value={sdgId}
                onChange={(e) => setSdgId(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>
            {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Success message */}
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>} {/* Error message */}
            <button
              type="submit"
              className="mt-2 bg-green-500 text-white p-2 rounded"
            >
              Add/Edit SDG
            </button>
          </form>
        </div>
      </main>
    </section>
  );
}