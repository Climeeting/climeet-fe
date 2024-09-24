import TopBar from '@/components/NavBar/TopBar.tsx'
import styles from './PartyReport.module.scss'
import { useState } from 'react'
import Dialog from '@/components/Dialog/Dialog.tsx'
import { post_party_report } from '@/services/party.ts'
import { useNavigate, useParams } from 'react-router-dom'
import useToast from '@/utils/useToast.tsx'

function PartyReport () {
  const [reason, setReason] = useState('')
  const [openAlertReportSuccess, setOpenAlertReportSuccess] = useState(false)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const toast = useToast()

  if (!id) return null

  return (
    <div className={styles.Container}>
      <TopBar>
        <TopBar.Left back />
        <TopBar.Center>신고하기</TopBar.Center>
      </TopBar>

      <main>
        <fieldset className={styles.Fileldset}>
          <div className={styles.LabelWrapper}>
            <h2 className={styles.Label}>신고 사유</h2>
          </div>
          <textarea
            className={styles.Textarea}
            value={reason}
            onChange={e => setReason(e.target.value)}
            maxLength={500}
          />
          <div className={styles.TextCount}>
            <span className={styles.CurrentCount}>{reason.length}자</span>
            <span className={styles.MaxCount}>/ 최대 500자</span>
          </div>
        </fieldset>
      </main>

      <div className={styles.Footer}>
        <button
          className={styles.ReportBtn}
          onClick={async () => {
            try {
              await post_party_report(Number(id), { reason })
              setOpenAlertReportSuccess(true)
            } catch (e) {
              if (e instanceof Error) {
                toast.add({
                  message: e.message,
                })
              }
            }
          }}
        >
          신고하기
        </button>
      </div>

      <Dialog open={openAlertReportSuccess} onOpenChange={setOpenAlertReportSuccess}>
        <Dialog.Content onAction={() => navigate('/')} hasCancel={false}>
          신고가 접수되었습니다.
        </Dialog.Content>
      </Dialog>
    </div>
  )
}

export default PartyReport
