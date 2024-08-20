import { useKakaoMap } from '@/utils/useKakaoMap'
import { Toasts } from '@/utils/useToast'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export default function Layout () {
  const status = useKakaoMap()

  return (
    <>
      <Toasts>
        <ScrollRestoration />
        {status && <Outlet />}
      </Toasts>
    </>
  )
}
