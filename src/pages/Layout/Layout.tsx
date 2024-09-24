import { useKakaoMap } from '@/utils/useKakaoMap'
import { Toasts } from '@/utils/useToast'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import styles from './Layout.module.scss'

export default function Layout () {
  const status = useKakaoMap()

  return (
    <div className={styles.Layout}>
      <Toasts>
        <ScrollRestoration />
        {status && <Outlet />}
      </Toasts>
    </div>
  )
}
