import { useFlow } from './stackflow'

export default function NotFoundPage() {
  const { replace } = useFlow()

  return (
    <div>
      <h2>404 Not Found</h2>
      <button onClick={() => replace('HomePage', {})}>홈으로</button>
    </div>
  )
}
