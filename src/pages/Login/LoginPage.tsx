import KakaoLogin from './components/KakaoLogin'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import styles from './LoginPage.module.scss'
import Logo from '@/assets/logo_text.png'

export default function LoginPage() {
  return (
    <AppScreen appBar={{ title: '' }}>
      <div className={styles.Container}>
        <img src={Logo} width={114} alt="logo" />
        <div className={styles.Bottom}>
          <KakaoLogin />
        </div>
      </div>
    </AppScreen>
  )
}
