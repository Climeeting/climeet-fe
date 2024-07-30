import { useIsLogin } from '@/services/user'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function CheckIsLogout() {
  const navigate = useNavigate()
  const { data: isLogin, isLoading } = useIsLogin()

  useEffect(
    function GoBack() {
      if (isLoading) return
      if (isLogin) navigate(-1)
    },
    [isLoading, isLogin]
  )

  return (
    <>
      <Outlet />
    </>
  )
}
