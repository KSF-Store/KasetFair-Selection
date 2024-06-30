'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Category = {
  categoryId: number;
  name: string;
}

export default function CategoryConfig() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | string>('');
  const [name, setName] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/admin/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setErrorMessage('Failed to load categories.');
    }
  };

  const handleAddOrUpdateCategory = async () => {
    if (categoryId && name) {
      const payload: Category = { categoryId: Number(categoryId), name };
      try {
        const response = await axios.post('/api/admin/category', payload);
        console.log('Category added/updated:', response.data);
        setSuccessMessage('Category added/updated successfully!');
        setErrorMessage('');
        fetchCategories();
      } catch (error) {
        console.error('Failed to add/update category:', error);
        setSuccessMessage('');
        setErrorMessage('An error occurred. Please try again.');
      }
    } else {
      alert('Please provide both Category ID and Name.');
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await axios.delete(`/api/admin/category/${categoryId}`);
      console.log('Category deleted');
      setSuccessMessage('Category deleted successfully!');
      setErrorMessage('');
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
      setSuccessMessage('');
      setErrorMessage('Failed to delete category.');
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Category Lists</h2>
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-bold mb-2">Add/Edit Category</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleAddOrUpdateCategory(); }}>
          <div className="mb-2">
            <label className="block text-gray-700">Category ID:</label>
            <input
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
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
            Add/Edit Category
          </button>
        </form>
      </div>
      <div className="mt-4 bg-white p-4 shadow rounded">
        <h3 className="text-lg font-bold mb-2">Category List</h3>
        {categories.length > 0 ? (
          <ul>
            {categories.map(category => (
              <li key={category.categoryId} className="mb-2 p-2 border-b flex justify-between items-center">
                <div>
                  <p><strong>Category ID:</strong> {category.categoryId}</p>
                  <p><strong>Name:</strong> {category.name}</p>
                </div>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDeleteCategory(category.categoryId)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories available at this moment.</p>
        )}
      </div>
    </>
  );
}
