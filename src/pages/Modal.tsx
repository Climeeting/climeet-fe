import { ActivityComponentType } from '@stackflow/react'
import { BottomSheet } from '@stackflow/plugin-basic-ui'

type ModalParams = {
  title: string
}
const Modal: ActivityComponentType<ModalParams> = () => {
  return (
    <BottomSheet>
      <div style={{ padding: '30px 10px' }}>Hello, World</div>
    </BottomSheet>
  )
}

export default Modal
