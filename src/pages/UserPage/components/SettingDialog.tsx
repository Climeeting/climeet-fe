import * as Dialog from '@radix-ui/react-dialog'
import styles from './SettingDialog.module.scss'
import Icon from '@/components/Icon/Icon'
import TopBar from '@/components/NavBar/TopBar'
import { useState } from 'react'
import { get_oauth_logout } from '@/services/oauth'
import { Link, useNavigate } from 'react-router-dom'
import useToast from '@/utils/useToast'
import { MyProfileQuery } from '@/services/user'
import AppInfoDialog from './AppInfoDialog'

export default function SettingDialog () {
  const [open, onOpenChange] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

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
                  navigate('/', { replace: true })
                  MyProfileQuery.logout()
                  toast.add({
                    message: '로그아웃 되었습니다.',
                  })
                }}
              >
                <Icon className={styles.icon} icon='Logout' size='16' />
                로그아웃
              </button>
            </li>
            <li>
              <Link to='/user/my/withdraw'>
                <Icon className={styles.icon} icon='Exit' size='16' />
                회원 탈퇴
              </Link>
            </li>
            <li>
              <AppInfoDialog>
                <button>
                  <Icon className={styles.icon} size='16' icon='Check' />
                  앱 관리
                </button>
              </AppInfoDialog>
            </li>
          </ul>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
