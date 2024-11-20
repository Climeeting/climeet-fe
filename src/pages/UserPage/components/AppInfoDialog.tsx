import * as Dialog from '@radix-ui/react-dialog'
import styles from './AppInfoDialog.module.scss'
import TopBar from '@/components/NavBar/TopBar'
import { useState } from 'react'
import { version } from '@/utils/version'

export default function AppInfoDialog ({ children }: { children: React.ReactNode }) {
  const [open, onOpenChange] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>

      <Dialog.Overlay />
      <Dialog.Portal>
        <Dialog.Content className={styles.container}>
          <TopBar bottomBorder>
            <TopBar.Left
              back
              onClick={() => {
                onOpenChange(false)
              }}
            />
            <TopBar.Center>앱 관리</TopBar.Center>
          </TopBar>

          <div className={styles.content}>
            <section>
              <h2 className={styles.title}>버전정보</h2>
              <div className={styles.info}>
                <div className={styles.logo}>
                  <img src='/android-chrome-192x192.png' width={48} />
                </div>
                <div className={styles.detail}>
                  <h3 className={styles.name}>클라이밋</h3>
                  <span className={styles.version}>v{version}</span>
                </div>
              </div>
            </section>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
