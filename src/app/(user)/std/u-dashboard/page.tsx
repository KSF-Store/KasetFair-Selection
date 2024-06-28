import UserDashboard from '@/components/admin/dashboard/user/uDashboard'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <section>
        <UserDashboard/>
    </section>
  )
}