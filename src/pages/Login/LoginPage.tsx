import { useLocation } from 'react-router-dom'
import KakaoLogin from './components/KakaoLogin'
import styles from './LoginPage.module.scss'
import Logo from '@/assets/logo_text.png'
import TopBar from '@/components/NavBar/TopBar'
import { useEffect } from 'react'

export default function LoginPage() {
  const location = useLocation()
  const redirect = new URLSearchParams(location.search).get('redirect')

  useEffect(() => {
    if (redirect) {
      localStorage.setItem('redirect', redirect)
    }
  }, [redirect])

  return (
    <div className={styles.Container}>
      <TopBar>
        <TopBar.Left back />
      </TopBar>
      <div>
        <img src={Logo} width={114} alt="logo" />
        <div className={styles.Bottom}>
          <KakaoLogin />
        </div>
      </div>
    </div>
  )
}
