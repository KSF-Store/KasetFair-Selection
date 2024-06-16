'use client'

import React from 'react';

type Props = {};

export default function SignInTemp({}: Props) {
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        console.log('Sign in with google');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white shadow-lg rounded-lg p-10" onSubmit={onFormSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center text-green-700">KSF Selection</h2>
                <button 
                    type="submit" 
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Sign In with Google @ku.th
                </button>
            </form>
        </div>
    );
}
