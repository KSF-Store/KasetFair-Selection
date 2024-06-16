
import React from 'react'

import UserDetail from '@/components/account/userDetail'
import SignoutTemp from '@/components/authen/signOut/signoutTemp'

type Props = {}

export default function page({}: Props) {

    return (
        <section className='flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-y-[2vh]'>
            <UserDetail/>
            <SignoutTemp/>
        </section>
    )
}