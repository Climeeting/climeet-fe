import BottomSheet from '@/components/BottomSheet'
import Icon from '@/components/Icon/Icon'
import styles from './SelectWithdrawReason.module.scss'
import { WithdrawReason } from './DeleteAccountPage'

type Props = {
  currentWithdrawReason: WithdrawReason | undefined
  setCurrentWithdrawReason: (withdrawReason: WithdrawReason) => void
}

export function SelectWithdrawReason ({ currentWithdrawReason, setCurrentWithdrawReason }: Props) {
  return (
    <BottomSheet>
      <BottomSheet.Trigger asChild>
        <button className={styles.Trigger} data-active={Boolean(currentWithdrawReason)}>
          {currentWithdrawReason === undefined ? '탈퇴 이유를 선택해 주세요.' : currentWithdrawReason}
          <Icon className={styles.Icon} icon='ArrowDown' size='12' />
        </button>
      </BottomSheet.Trigger>
      <BottomSheet.Content>
        <div className={styles.Content}>
          <div className={styles.Header}>
            <h2>탈퇴 이유</h2>
            <BottomSheet.Close className={styles.Close}>
              <Icon icon='Close' size='24' />
            </BottomSheet.Close>
          </div>
          <ul className={styles.ReasonList}>
            {Object.values(WithdrawReason).map(withdrawReason => (
              <li key={withdrawReason}>
                <button
                  className={styles.ReasonOptionButton}
                  onClick={() => setCurrentWithdrawReason(withdrawReason)}
                  data-selected={currentWithdrawReason === withdrawReason}
                >
                  {withdrawReason}
                  {currentWithdrawReason === withdrawReason && (
                    <Icon className={styles.Icon} icon='Check' size='20' />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </BottomSheet.Content>
    </BottomSheet>
  )
}
