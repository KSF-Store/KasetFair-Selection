
import React from 'react';


import Image from 'next/image';

import OnGetCurrentSession from '@/utils/getSession/getCurrentSession';

type Props = {};

export default async function UserDetail({}: Props) {
    const session = await OnGetCurrentSession()
    const currentUser = session?.user 
    return (
        <div className="flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-10 max-w-sm w-full">
                <div className="flex flex-col items-center">
                    <Image
                        src={currentUser.image || '/default-profile.png'} // fallback image
                        alt="User Profile"
                        className="w-24 h-24 rounded-full mb-4"
                        width={200}
                        height={200}
                    />
                    <h2 className="text-2xl font-bold mb-2 text-center">{currentUser.name}</h2>
                    <p className="text-gray-700 mb-4 text-center">{currentUser.email}</p>
                </div>
            </div>
        </div>
    );
}
