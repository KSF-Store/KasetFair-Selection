'use client'

import OnUserSignIn from '@/server/auth/OnUserSignIn';
import React from 'react';

type Props = {};

export default function SignInTemp({}: Props) {
    const onFormSubmit = (formData : any) => {
        const action = formData.get('action');
        OnUserSignIn(action)
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white shadow-lg rounded-lg p-10"  action={onFormSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center text-green-700">KSF Selection</h2>
                <button 
                    type="submit"
                    name='action'
                    value='google'
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Sign In with Google @ku.th
                </button>
            </form>
        </div>
    );
}
