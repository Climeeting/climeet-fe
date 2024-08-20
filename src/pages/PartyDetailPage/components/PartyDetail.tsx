import { PartyDetailQuery, PartyDetailType, usePartyDetailSuspense } from '@/services/party'
import { PartyMainInfo } from './PartyMainInfo'
import { PartyParticipants } from './PartyParticipants'
import { PartyLocation } from './PartyLocation'
import NotFound from '@/components/NotFound'
import styles from './PartyDetail.module.scss'

export default function PartyDetail ({ data }: { data: PartyDetailType }) {
  return (
    <>
      <section>
        <PartyMainInfo {...data} />
      </section>

      <section>
        <PartyLocation {...data} />
      </section>

      <section>
        <PartyParticipants {...data} />
      </section>

      {/* <section>
        <PartyClimbInfo />
      </section> */}
    </>
  )
}

PartyDetail.Query = function Container ({ id }: { id: number }) {
  const { data } = usePartyDetailSuspense(id)
  return <PartyDetail data={data} />
}

PartyDetail.Retry = function Retry ({ id }: { id: number }) {
  return (
    <div className={styles.ErrorContainer}>
      <NotFound
        message='파티 정보를 불러오는데 실패했습니다.'
        refresh={() => {
          PartyDetailQuery.refetch(id)
        }}
      />
    </div>
  )
}

PartyDetail.Skeleton = function Skeleton () {
  return (
    <div>
      <h1>로딩중!~~</h1>
    </div>
  )
}
