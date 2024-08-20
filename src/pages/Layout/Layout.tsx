import { useKakaoMap } from '@/utils/useKakaoMap'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export default function Layout () {
  const status = useKakaoMap()

  return (
    <>
      <ScrollRestoration />
      {status && <Outlet />}
    </>
  )
}
