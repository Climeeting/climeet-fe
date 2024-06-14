import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h2>404 Not Found</h2>
      <button onClick={() => navigate('/', { replace: true })}>홈으로</button>
    </div>
  )
}
