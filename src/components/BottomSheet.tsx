import { PropsWithChildren } from 'react'
import styles from './BottomSheet.module.scss'
import * as Dialog from '@radix-ui/react-dialog'

type Props = { onClickOverlay?: () => void } & PropsWithChildren
function BottomSheetContent({ children, onClickOverlay }: Props) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay onClick={onClickOverlay} className={styles.Overlay} />
      <Dialog.Content className={styles.Content}>{children}</Dialog.Content>
    </Dialog.Portal>
  )
}

const BottomSheet = Object.assign(Dialog.Root, {
  Trigger: Dialog.Trigger,
  Close: Dialog.Close,
  Content: BottomSheetContent,
})

export default BottomSheet
