import KakaoLogin from './components/KakaoLogin'
import styles from './LoginPage.module.scss'
import Logo from '@/assets/logo_text.png'
import TopBar from '@/components/NavBar/TopBar'

export default function LoginPage() {
  return (
    <div className={styles.Container}>
      <TopBar />
      <div>
        <img src={Logo} width={114} alt="logo" />
        <div className={styles.Bottom}>
          <KakaoLogin />
        </div>
      </div>
    </div>
  )
}
