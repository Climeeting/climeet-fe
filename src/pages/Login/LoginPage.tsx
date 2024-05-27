import KakaoLogin from './components/KakaoLogin'
import { AppScreen } from '@stackflow/plugin-basic-ui'

export default function LoginPage() {
  return (
    <AppScreen appBar={{ title: '' }}>
      <h2>카카오톡 로그인 페이지</h2>
      <KakaoLogin />
    </AppScreen>
  )
}
