import { PropsWithChildren } from 'react'
import styles from './SideSheet.module.scss'
import * as Dialog from '@radix-ui/react-dialog'

type Props = { onClickOverlay?: () => void } & PropsWithChildren
function SideSheetContent({ children, onClickOverlay }: Props) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay onClick={onClickOverlay} className={styles.Overlay} />
      <Dialog.Content className={styles.SideSheetContent}>{children}</Dialog.Content>
    </Dialog.Portal>
  )
}

const SideSheet = Object.assign(Dialog.Root, {
  Trigger: Dialog.Trigger,
  Close: Dialog.Close,
  Content: SideSheetContent,
})

export default SideSheet
