import styles from './DeleteAccountPage.module.scss'
import Checkbox from '@/components/CheckBox.tsx'
import { useState } from 'react'
import Chip from '@/components/Chip.tsx'
import TopBar from '@/components/NavBar/TopBar.tsx'
import DeleteAccountImg from '@/assets/delete-account.png'
import { SelectWithdrawReason } from './SelectWithdrawReason'

export enum WithdrawReason {
  HARD = '파티 참가가 어려움',
  COMPLICATE = '파티 생성 절차 복잡',
  SIMILAR_SERVICE = '유사 서비스 이용',
  ETC = '기타',
}

export default function DeleteAccountPage () {
  const [isAgree, setIsAgree] = useState(false)
  const [reason, setReason] = useState('')
  const [currentWithdrawReason, setCurrentWithdrawReason] = useState<WithdrawReason | undefined>(undefined)
  const disabled = !isAgree || currentWithdrawReason === undefined

  return (
    <div className={styles.Container}>
      <TopBar>
        <TopBar.Center title='회원탈퇴' />
        <TopBar.Left back />
      </TopBar>
      <div className={styles.Main}>
        <div className={styles.Header}>
          <img src={DeleteAccountImg} className={styles.Img} />
          <h1 className={styles.Title}>
            클라이밋은
            <br />
            <strong>더 나은 클라이밍 문화</strong>를 위해
            <br />
            항상 노력하겠습니다.
          </h1>
        </div>
        <div className={styles.Notification}>
          <div className={styles.NotificationTitle}>탈퇴하기 전 아래 내용을 확인해 주세요.</div>
          <ul className={styles.List}>
            <li className={styles.ListItem}>
              회원님의 모든 활동 정보는 다른 멤버가 식별할 수 없도록 바로 삭제되며,{' '}
              <strong>삭제된 데이터는 복구할 수 없습니다.</strong> (이름, 프로필 사진, 파티 참여 및
              진행 내역, 채팅 내용 등)
            </li>
            <li className={styles.ListItem}>
              참여 또는 진행하고 있는 모임이 있다면 탈퇴할 수 없습니다.
            </li>
            <li className={styles.ListItem}>
              부정 이용 방지를 위해 탈퇴 후 14일 동안 클라이밋에 다시 가입할 수 없습니다.
            </li>
          </ul>
        </div>
        <div className={styles.ReasonContainer}>
          <div className={styles.Label}>탈퇴 이유</div>
          <SelectWithdrawReason currentWithdrawReason={currentWithdrawReason} setCurrentWithdrawReason={setCurrentWithdrawReason} />
        </div>
        {
          currentWithdrawReason === WithdrawReason.ETC && (
            <fieldset className={styles.Fieldset}>
              <div className={styles.TopLabel}>탈퇴 사유 (선택)</div>
              <textarea
                onChange={(e) => {
                  setReason(e.target.value)
                }}
                value={reason}
                className={styles.Textarea}
                placeholder='탈퇴 사유를 입력해 주세요.'
                maxLength={500}
              />
              <div className={styles.MinMax}>{`${reason.length}자/최대500자`}</div>
            </fieldset>
          )
        }
      </div>
      <div className={styles.Bottom}>
        <Checkbox id='agree' checked={isAgree} onCheckedChange={setIsAgree}>
          <span className={styles.Text}>안내 사항을 확인했으며, 이에 동의합니다.</span>
        </Checkbox>
        <Chip className={styles.Button} variable={disabled ? 'default' : 'primary'} asChild>
          <button disabled={disabled} onClick={() => {}}>
            회원탈퇴
          </button>
        </Chip>
      </div>
    </div>
  )
}
