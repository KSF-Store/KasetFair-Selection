import React from 'react'

import UserDashboard from '@/components/user/dashboard/u_dashboard'

type Props = {}

export default function page({}: Props) {
  return (
    <section>
        <UserDashboard/>
    </section>
  )
}