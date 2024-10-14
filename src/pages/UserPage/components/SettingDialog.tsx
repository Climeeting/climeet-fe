import * as Dialog from '@radix-ui/react-dialog'
import styles from './SettingDialog.module.scss'
import Icon from '@/components/Icon/Icon'
import TopBar from '@/components/NavBar/TopBar'
import { useState } from 'react'
import { get_oauth_logout } from '@/services/oauth'

export default function SettingDialog () {
  const [open, onOpenChange] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <button className={styles.trigger}>
          <Icon className={styles.Icon} size='24' icon='Setting' />
        </button>
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
            <TopBar.Center>설정</TopBar.Center>
          </TopBar>

          <ul className={styles.list}>
            <li>
              <button
                onClick={async () => {
                  await get_oauth_logout()
                  window.location.href = '/'
                }}
              >
                <Icon className={styles.icon} icon='Logout' size='16' />
                로그아웃
              </button>
            </li>
            <li>
              <button>
                <Icon className={styles.icon} icon='Exit' size='16' />
                회원 탈퇴
              </button>
            </li>
          </ul>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
