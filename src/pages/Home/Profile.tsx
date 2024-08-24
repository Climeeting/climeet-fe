import { useMyProfile } from '@/services/user'

export default function Profile () {
  const { data, isError } = useMyProfile()

  if (!data || isError) return null

  return (
    <div>
      <div>{data.nickname}</div>
      <div>{data.userId}</div>
      <img src={data.profileImageUrl} alt='profile' />
    </div>
  )
}
