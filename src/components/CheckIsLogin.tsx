import { useIsLogin } from '@/services/user'
import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  redirect?: '/login' | '/home'
} & PropsWithChildren

export default function CheckIsLogin({ children, redirect = '/login' }: Props) {
  const navigate = useNavigate()
  const isLogin = useIsLogin()

  useEffect(
    function GoLogin() {
      if (!isLogin && redirect) navigate(redirect, { replace: true })
    },
    [isLogin, redirect]
  )

  return children
}
