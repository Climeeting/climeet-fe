import Icon from '@/components/Icon/Icon'
import styles from './AppleLogin.module.scss'

export default function AppleLogin () {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT}`

  return (
    <button className={styles.Button} onClick={() => window.location.replace(`${KAKAO_AUTH_URL}`)}>
      <Icon className={styles.Icon} icon='AppleLogo' />
      Apple로 계속하기
    </button>
  )
}
