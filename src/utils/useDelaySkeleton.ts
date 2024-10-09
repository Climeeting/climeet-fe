import { useState } from 'react'
import { useEffectOnce } from 'react-use'

export default function useDelaySkeleton () {
  const [isShow, setIsShow] = useState(false)

  useEffectOnce(() => {
    const timer = window.setTimeout(() => {
      setIsShow(true)
    }, 500)
    return () => {
      clearInterval(timer)
    }
  })

  return isShow
}
