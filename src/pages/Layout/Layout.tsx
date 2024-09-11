import { useKakaoMap } from '@/utils/useKakaoMap'
import { ChatsSocketProvider } from '@/utils/useChatSocket'
import { Toasts } from '@/utils/useToast'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export default function Layout () {
  const status = useKakaoMap()

  return (
    <ChatsSocketProvider>
      <Toasts>
        <ScrollRestoration />
        {status && <Outlet />}
      </Toasts>
    </ChatsSocketProvider>
  )
}
