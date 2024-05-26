import { get_oauth_logout } from '../../services/oauth'
import Profile from './Profile'
import { useStack } from '@stackflow/react'
import { useFlow } from '../stackflow'
import { useEffect } from 'react'

export default function HomePage() {
  const stack = useStack()
  const { push } = useFlow()

  useEffect(() => {
    console.log('현재 쌓여진 액티비티들:', stack.activities)
    console.log('전체 전환 상태:', stack.globalTransitionState)
    console.log('초기에 설정된 Transition Duration 옵션', stack.transitionDuration)
  }, [stack])

  return (
    <>
      <h2>클라이밋</h2>
      <Profile />
      <button
        onClick={() => {
          push('LoginPage', {})
        }}
      >
        로그인 하러 가기
      </button>
      <button onClick={get_oauth_logout}>로그아웃</button>
    </>
  )
}
