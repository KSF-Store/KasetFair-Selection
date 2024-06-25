import UserDashboard from '@/components/dashboard/user/uDashboard'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <section>
        <UserDashboard/>
    </section>
  )
}