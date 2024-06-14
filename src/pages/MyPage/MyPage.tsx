import TopBar from '@/components/NavBar/TopBar'
import Profile from '@/components/Profile'
import { useIsLogin } from '@/services/user'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MyPage() {
  const navigate = useNavigate()
  const isLogin = useIsLogin()

  useEffect(
    function GoHome() {
      if (!isLogin) navigate('/login', { replace: true })
    },
    [isLogin]
  )

  return (
    <div>
      <TopBar />
      <Profile />
      {isLogin ? '로그인 되어 있습니다.' : '로그인 되어 있지 않습니다.'}
    </div>
  )
}
