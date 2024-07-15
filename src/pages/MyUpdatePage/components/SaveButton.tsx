import { AdditionalInfoAddapter, post_user_additionalInfo } from '@/services/user'
import { useMyInfoFormContext } from '../hooks/useMyInfoForm'
import styles from './SaveButton.module.scss'
export function SaveButton({ onClick }: { onClick: () => void }) {
  const { sex, skillLevel, description } = useMyInfoFormContext()

  return (
    <button
      onClick={async () => {
        onClick?.()
        await post_user_additionalInfo(
          new AdditionalInfoAddapter({
            sex,
            skill: skillLevel,
            description,
          }).adapt()
        )
      }}
      className={styles.Button}
    >
      저장
    </button>
  )
}
