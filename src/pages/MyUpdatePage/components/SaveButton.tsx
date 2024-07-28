import { PutUserInfomationAdapter, put_user_information } from '@/services/user'
import { useMyInfoFormContext } from '../hooks/useMyInfoForm'
import styles from './SaveButton.module.scss'
import { useFileContext } from '../hooks/useFileContext'
import { uploadFileS3 } from '@/utils/s3'
export function SaveButton({ onClick }: { onClick: () => void }) {
  const info = useMyInfoFormContext()
  const file = useFileContext()

  return (
    <button
      onClick={async () => {
        onClick?.()

        let profileImageUrl = info.profileImageUrl
        if (file) profileImageUrl = await uploadFileS3(file)

        await put_user_information({
          ...new PutUserInfomationAdapter(info).adapt(),
          profileImageUrl,
        })
      }}
      className={styles.Button}
    >
      저장
    </button>
  )
}
