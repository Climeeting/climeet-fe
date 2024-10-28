import TopBar from '@/components/NavBar/TopBar'
import styles from './WithdrawPage.module.scss'
import WithdrawImg from '@/assets/withdraw.png'
import BottomSheet from '@/components/BottomSheet'
import Icon from '@/components/Icon/Icon'
import { useState } from 'react'
import { useMount } from 'react-use'
import Checkbox from '@/components/CheckBox'
import { delete_user_withdraw } from '@/services/oauth'
import useToast from '@/utils/useToast'

type Option = {
  label: string
  value: number
}

const reasonOptions: Option[] = [
  {
    label: '파티 참가가 어려움',
    value: 0,
  },
  {
    label: '파티 생성 절차 복잡',
    value: 1,
  },
  {
    label: '유사 서비스 이용',
    value: 2,
  },
  {
    label: '기타',
    value: 3,
  },
]

export default function WithdrawPage () {
  const [reason, setReason] = useState<Option | null>(null)
  const [detail, setDetail] = useState('')
  const toast = useToast()

  return (
    <div className={styles.Container}>
      <TopBar bottomBorder>
        <TopBar.Left back />
        <TopBar.Center>회원탈퇴</TopBar.Center>
      </TopBar>

      <section className={styles.contents}>
        <img width={132} height={132} src={WithdrawImg} alt='withdraw' />
        <span>
          클라이밋은<br />
          <strong>더 나은 클라이밍 문화</strong>를 위해<br />
          항상 노력하겠습니다.<br />
        </span>
      </section>

      <section className={styles.notification}>
        <h3>탈퇴하기 전 아래 내용을 확인해 주세요.</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            회원님의 모든 활동 정보는 다른 멤버가 식별할 수 없도록 바로 삭제되며, <strong>삭제된 데이터는 복구할 수 없습니다.</strong> (이름, 프로필 사진, 파티 참여 및 진행 내역, 채팅 내용 등)
          </li>
          <li className={styles.item}>
            참여 또는 진행하고 있는 모임이 있다면 탈퇴할 수 없습니다.
          </li>
          <li className={styles.item}>
            부정 이용 방지를 위해 탈퇴 후 14일 동안 클라이밋에 다시 가입할 수 없습니다.
          </li>
        </ul>
      </section>

      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <SelectReason
          reason={reason}
          onChange={(reasonOption) => {
            setReason(reasonOption)
            setDetail('')
          }}
        />
        {
          reason?.value === 3
          && <ReasonTextarea detail={detail} setDetail={setDetail} />
        }
        <SubmitBar
          disabled={reason === null}
          onSubmit={async () => {
            if (reason === null) return
            try {
              await delete_user_withdraw(reason.value === 3 ? detail : reason.label)
              toast.add({
                message: '탈퇴가 완료되었습니다.',
              })
              window.location.href = '/'
            } catch (e) {
              if (e instanceof Error) {
                toast.add({
                  message: e.message,
                })
              } else {
                toast.add({
                  message: '탈퇴에 실패하였습니다.',
                })
              }
            }
          }}
        />
      </form>
    </div>
  )
}

function SelectReason ({ reason, onChange }: { reason: Option | null, onChange: (reason: Option) => void }) {
  const [open, onOpenChange] = useState(false)

  return (
    <div className={styles.selector}>
      <h3>탈퇴 이유</h3>
      <BottomSheet open={open} onOpenChange={onOpenChange}>
        <BottomSheet.Trigger asChild>
          <button className={styles.trigger} data-active={Boolean(reason)}>
            {reason === null ? '탈퇴 이유를 선택해 주세요.' : reason.label}
            <Icon className={styles.icon} icon='ArrowDown' size='12' />
          </button>
        </BottomSheet.Trigger>
        <BottomSheet.Content>
          <div className={styles.selectorContent}>
            <div className={styles.header}>
              <h2>탈퇴 이유</h2>
              <BottomSheet.Close className={styles.close}>
                <Icon icon='Close' size='24' />
              </BottomSheet.Close>
            </div>
            <ul className={styles.selectorList}>
              {reasonOptions.map(({ value, label }) => (
                <li key={value}>
                  <button
                    className={styles.optionButton}
                    onClick={() => {
                      onChange({ value, label })
                      onOpenChange(false)
                    }}
                    data-selected={value === reason?.value}
                  >
                    {label}
                    {value === reason?.value && (
                      <Icon className={styles.Icon} icon='Check' size='20' />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    </div>
  )
}

const MAX_REASON_DETAIL_LENGTH = 500

function ReasonTextarea ({
  detail,
  setDetail,
}: {
  detail: string
  setDetail: (detail: string) => void
}) {
  useMount(function ScrollToVisible () {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  })

  return (
    <div className={styles.reasonTextarea}>
      <h3>기타 탈퇴 이유(선택)</h3>
      <textarea
        value={detail}
        onChange={(e) => {
          if (e.target.value.length > MAX_REASON_DETAIL_LENGTH) return
          setDetail(e.target.value)
        }}
        className={styles.textarea}
        placeholder='탈퇴 사유를 입력해 주세요.'
      />
      <span className={styles.textCount}>
        {detail.length}자 / 최대 {MAX_REASON_DETAIL_LENGTH}자
      </span>
    </div>
  )
}

function SubmitBar ({
  disabled,
  onSubmit,
}: {
  disabled: boolean
  onSubmit: () => void
}) {
  const [checked, setChecked] = useState(false)
  return (
    <div className={styles.submitBar}>
      <div className={styles.checkboxContainer}>
        <Checkbox
          disabled={disabled}
          checked={checked}
          onCheckedChange={setChecked}
          id='agree'
        >
          안내 사항을 확인하였으며, 이에 동의합니다.
        </Checkbox>
      </div>
      <button
        className={styles.submit}
        data-disabled={disabled || !checked}
        disabled={disabled || !checked}
        onClick={onSubmit}
      >
        회원탈퇴
      </button>
    </div>
  )
}
