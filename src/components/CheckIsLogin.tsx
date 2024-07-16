import { useIsLogin } from '@/services/user'
import { PropsWithChildren, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

type Props = {
  redirect?: '/login' | '/home'
} & PropsWithChildren

export default function CheckIsLogin({ redirect = '/login' }: Props) {
  const navigate = useNavigate()
  const { data: isLogin } = useIsLogin()

  useEffect(
    function GoLogin() {
      if (!isLogin && redirect) navigate(redirect, { replace: true })
    },
    [isLogin, redirect]
  )

  return (
    <>
      <Outlet />
    </>
  )
}
