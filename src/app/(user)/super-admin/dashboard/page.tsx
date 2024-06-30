import React from 'react'

import StoreList from '@/components/admin/dashconfig/storeList'

type Props = {}

export default function page({}: Props) {
  return (
    <section>
      <div className='flex flex-row w-full justify-between'>
        <div className='p-5 rounded-xl bg-gray-300'>
          prepare stage
        </div>
        <div className='p-5 rounded-xl bg-gray-300'>
          approve request
        </div>
        <div className='p-5 rounded-xl bg-gray-300'>
          success 
        </div>
        <div className='p-5 rounded-xl bg-gray-300'>
          Help
        </div>
      </div>
      <StoreList/>
    </section>
  )
}