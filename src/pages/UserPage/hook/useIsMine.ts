import { useMyProfile } from '@/services/user'
import { useDeferredValue } from 'react'
import { useParams } from 'react-router-dom'

export default function useIsMine () {
  const { id } = useParams<{ id: string }>()
  const { data } = useMyProfile()
  const isMine = useDeferredValue(id === String(data?.userId))

  return isMine
}
