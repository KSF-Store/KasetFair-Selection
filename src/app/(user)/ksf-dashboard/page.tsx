import React from 'react'

import AllStoreDashboard from '@/components/user/dashboard/ksf_dashboard'

type Props = {}

export default function page({}: Props) {
  return (
    <div>
        All kaset fair dashboard for all user can see what are they selling types details slogan and more.
        <AllStoreDashboard/>
    </div>
  )
}