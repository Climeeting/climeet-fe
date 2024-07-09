import { PropsWithChildren } from 'react'
import styles from './Dialog.module.scss'
import * as DialogUi from '@radix-ui/react-dialog'
import classNames from 'classnames'

function DialogContent({ children }: PropsWithChildren) {
  return (
    <DialogUi.Portal>
      <DialogUi.Overlay className={styles.Overlay} />
      <DialogUi.Content className={styles.Content}>
        <h2 className={styles.Title}>{children}</h2>
        <div className={styles.Controls}>
          <DialogUi.Close className={classNames(styles.Button, styles.Close)}>취소</DialogUi.Close>
          <DialogUi.Close className={classNames(styles.Button, styles.Confirm)}>
            확인
          </DialogUi.Close>
        </div>
      </DialogUi.Content>
    </DialogUi.Portal>
  )
}

const Dialog = Object.assign(DialogUi.Root, {
  Trigger: DialogUi.Trigger,
  Close: DialogUi.Close,
  Content: DialogContent,
})

export default Dialog
