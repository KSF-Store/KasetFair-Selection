'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sdg } from '@/interface/dbType';
import { SdgPayload } from '@/interface/payloadType';

export default function SdgConfig() {
  const [sdgs, setSdgs] = useState<Sdg[]>([]);
  const [sdgId, setSdgId] = useState<number | string>('');
  const [name, setName] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onGetSdgs = async () => {
    try {
      const response = await axios.get("/api/admin/sdgs");
      setSdgs(response.data);
    } catch (error: any) {
      console.log(error);
      setErrorMessage("Failed to load SDGs.");
    }
  }

  const handleAddSdg = async () => {
    if (sdgId && name) {
      const newSdg: SdgPayload = { sdgId: Number(sdgId), name };
      await onAddSDG(newSdg);
    } else {
      alert("Please provide both SDG ID and Name.");
    }
  }

  const onAddSDG = async (sdg: SdgPayload) => {
    try {
      const response = await axios.post("/api/admin/sdgs", sdg);
      console.log("SDG added:", response.data);
      setErrorMessage('');
      setSuccessMessage('SDG added successfully!');
      onGetSdgs();
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
    onGetSdgs();
  }, []);

  return (
    <div>
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
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          <button
            type="submit"
            className="mt-2 bg-green-500 text-white p-2 rounded"
          >
            Add/Edit SDG
          </button>
        </form>
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
    </div>
  );
}
