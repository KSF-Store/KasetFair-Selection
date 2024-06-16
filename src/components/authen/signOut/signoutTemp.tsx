'use client'

import OnUserSignOut from '@/server/auth/OnUserSignOut'
import React from 'react'

type Props = {}

export default function SignoutTemp({}: Props) {
    const onClickHandler = async () => {   
        await OnUserSignOut()
    }
  return (
    <button
        className='text-xl p-4 rounded-lg bg-secondary'
        onClick={onClickHandler}
    >
        Sign out
    </button>
  )
}