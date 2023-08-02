import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
        <div>This is nav</div>
        <Outlet/>
        <div>This is footer</div>
    </>
  )
}
