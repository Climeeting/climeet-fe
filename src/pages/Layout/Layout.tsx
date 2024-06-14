import { Outlet, ScrollRestoration } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}
