import { AppScreen } from '@stackflow/plugin-basic-ui'
import styles from './PartyDetailPage.module.scss'
import Chip from '@/components/Chip'
import { PartyMainInfo } from './components/PartyMainInfo'
import { PartyDescription } from './components/PartyDescription'
import { PartyClimbInfo } from './components/PartyClimbInfo'
import { PartyParticipants } from './components/PartyParticipants'

type Props = {
  params: { id: string }
}

export function PartyDetailPage({ params }: Props) {
  const { id } = params

  return (
    <AppScreen preventSwipeBack appBar={{ title: `파티 상세 ${id}` }}>
      <div className={styles.Container}>
        <section>
          <PartyMainInfo />
        </section>

        <section>
          <PartyDescription />
        </section>

        <section>
          <PartyParticipants />
        </section>

        <section>
          <PartyClimbInfo />
        </section>
      </div>
      <div className={styles.Bottom}>
        <Chip className={styles.Button} variable="primary" asChild>
          <button>지금 파티 참가하기!</button>
        </Chip>
      </div>
    </AppScreen>
  )
}
