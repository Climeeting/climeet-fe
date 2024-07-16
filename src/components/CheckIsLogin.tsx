import { useIsLogin } from '@/services/user'
import { PropsWithChildren, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

type Props = {
  redirect?: '/login' | '/home'
} & PropsWithChildren

export default function CheckIsLogin({ redirect = '/login' }: Props) {
  const navigate = useNavigate()
  const { data: isLogin, isLoading } = useIsLogin()

  useEffect(
    function GoLogin() {
      if (isLoading) return
      if (!isLogin && redirect) navigate(redirect, { replace: true })
    },
    [isLoading, isLogin, redirect]
  )

  return (
    <>
      <Outlet />
    </>
  )
}
