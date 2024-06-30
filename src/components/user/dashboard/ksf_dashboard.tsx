import React from 'react'

import StoreList from '@/components/admin/dashconfig/storeList'

type Props = {}

export default function AllStoreDashboard({}: Props) {
  return (
    <section>
        <h1>Store Dashboard</h1>
        <input 
            placeholder="Search all store comppettion or store details here"
        />
        <StoreList/>
    </section>
  )
}