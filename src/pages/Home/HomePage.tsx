import { Link } from 'react-router-dom'
import { useMyProfile } from '../../services/user'
import { get_oauth_logout } from '../../services/oauth'
import Profile from './Profile'

export default function HomePage() {
  const { data } = useMyProfile()
  console.log({ data })

  return (
    <>
      <h2>클라이밋</h2>
      <Profile />
      <Link to="/login">로그인 하러 가기</Link>
      <button onClick={get_oauth_logout}>로그아웃</button>
    </>
  )
}
