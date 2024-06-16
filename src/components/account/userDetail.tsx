
import React from 'react';
import { auth } from '@/lib/authentication/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';

type Props = {};

export default async function UserDetail({}: Props) {
    const session = await auth();

    if (!session?.user) {
        // Redirect to sign-in page if the user is not logged in
        return redirect('/');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-10 max-w-sm w-full">
                <div className="flex flex-col items-center">
                    <Image
                        src={session.user.image || '/default-profile.png'} // fallback image
                        alt="User Profile"
                        className="w-24 h-24 rounded-full mb-4"
                        width={200}
                        height={200}
                    />
                    <h2 className="text-2xl font-bold mb-2 text-center">{session.user.name}</h2>
                    <p className="text-gray-700 mb-4 text-center">{session.user.email}</p>
                </div>
            </div>
        </div>
    );
}
