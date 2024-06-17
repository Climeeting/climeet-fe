import styles from './PartyDetailPage.module.scss'
import Chip from '@/components/Chip'
import { PartyMainInfo } from './components/PartyMainInfo'
import { PartyDescription } from './components/PartyDescription'
import { PartyClimbInfo } from './components/PartyClimbInfo'
import { PartyParticipants } from './components/PartyParticipants'
import { useParams } from 'react-router-dom'
import TopBar from '@/components/NavBar/TopBar'
import { useEffect } from 'react'
import useGeolocation from '../Home/hooks/useGelolocation'

export function PartyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const location = useGeolocation();

  useEffect(() => {
    console.log(location)
  }, [location])

  return (
    <>
      <TopBar type="default" title={`파티 디테일 ${id}`} />
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
    </>
  )
}
