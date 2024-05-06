import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <h2>클라이밋</h2>
      <Link to="/login">로그인 하러 가기</Link>
    </>
  )
}
