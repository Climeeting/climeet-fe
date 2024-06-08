import Profile from '@/components/Profile'
import { useIsLogin } from '@/services/user'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useEffect } from 'react'
import { useFlow } from '../stackflow'

export default function MyPage() {
  const isLogin = useIsLogin()
  const { replace } = useFlow()

  useEffect(
    function GoHome() {
      if (!isLogin) replace('LoginPage', {})
    },
    [isLogin]
  )

  return (
    <AppScreen preventSwipeBack appBar={{ title: '마이페이지' }}>
      <Profile />
      {isLogin ? '로그인 되어 있습니다.' : '로그인 되어 있지 않습니다.'}
    </AppScreen>
  )
}
