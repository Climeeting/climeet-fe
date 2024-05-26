import { ActivityComponentType } from '@stackflow/react'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useFlow } from '../utils/stackflow'

type ArticleParams = {
  title: string
}
const Article: ActivityComponentType<ArticleParams> = ({ params }) => {
  const { push } = useFlow()

  const onClick = () => {
    push('Modal', {
      title: 'Hello',
    })
  }

  return (
    <AppScreen appBar={{ title: 'Article' }}>
      <div>
        <h1>{params.title}</h1>
        <button onClick={onClick}>bottom sheet</button>
      </div>
    </AppScreen>
  )
}

export default Article
