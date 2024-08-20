import { PropsWithChildren } from 'react'
import styles from './Dialog.module.scss'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import classNames from 'classnames'

function DialogContent ({
  children,
  onClose,
  onAction,
  hasCancel = true,
}: { onClose?: () => void, onAction?: () => void, hasCancel?: boolean } & PropsWithChildren) {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className={styles.Overlay} />
      <AlertDialog.Content className={styles.Content}>
        <h2 className={styles.Title}>{children}</h2>
        <div className={styles.Controls}>
          {hasCancel && (
            <AlertDialog.Cancel
              onClick={onClose}
              className={classNames(styles.Button, styles.Close)}
            >
              취소
            </AlertDialog.Cancel>
          )}
          <AlertDialog.Action
            onClick={() => {
              onAction?.()
              onClose?.()
            }}
            className={classNames(styles.Button, styles.Confirm)}
          >
            확인
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  )
}

const Dialog = Object.assign(AlertDialog.Root, {
  Trigger: AlertDialog.Trigger,
  Action: AlertDialog.Action,
  Cancel: AlertDialog.Cancel,
  Content: DialogContent,
})

export default Dialog
