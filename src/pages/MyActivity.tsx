import { ActivityComponentType, useStack } from '@stackflow/react'
import { useFlow } from '../utils/stackflow'
import { useEffect } from 'react'

const MyActivity: ActivityComponentType = () => {
  const stack = useStack()
  const { push } = useFlow()

  const onClick = () => {
    push('Article', {
      title: 'Hello',
    })
  }

  useEffect(() => {
    console.log('현재 쌓여진 액티비티들:', stack.activities)
    console.log('전체 전환 상태:', stack.globalTransitionState)
    console.log('초기에 설정된 Transition Duration 옵션', stack.transitionDuration)
  }, [stack])

  return (
    <div>
      <div>
        My Activity
        <button onClick={onClick}>Go to article page</button>
      </div>
    </div>
  )
}

export default MyActivity
