import { PutUserInfomationAdapter, put_user_information } from '@/services/user'
import { useMyInfoFormContext } from '../hooks/useMyInfoForm'
import styles from './SaveButton.module.scss'
export function SaveButton({ onClick }: { onClick: () => void }) {
  const info = useMyInfoFormContext()

  return (
    <button
      onClick={async () => {
        onClick?.()
        await put_user_information(new PutUserInfomationAdapter(info).adapt())
      }}
      className={styles.Button}
    >
      저장
    </button>
  )
}
