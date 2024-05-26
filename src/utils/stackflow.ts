import { stackflow } from '@stackflow/react'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import MyActivity from '../pages/MyActivity'
import { basicUIPlugin } from '@stackflow/plugin-basic-ui'
import Article from '../pages/Article'
import Modal from '../pages/Modal'

export const { Stack, useFlow, useStepFlow } = stackflow({
  transitionDuration: 350,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
  ],
  activities: {
    MyActivity,
    Article,
    Modal,
  },
  initialActivity: () => 'MyActivity',
})
