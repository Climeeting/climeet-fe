import { useEffect } from 'react'
import { useMyProfile } from '@/services/user'
import { useNavigate } from 'react-router-dom'

export default function RedirectUserPage () {
  const { data } = useMyProfile()
  const navigate = useNavigate()

  useEffect(() => {
    if (data?.userId) {
      navigate(`/user/${data.userId}`)
    }
  }, [data?.userId])

  return null
}
