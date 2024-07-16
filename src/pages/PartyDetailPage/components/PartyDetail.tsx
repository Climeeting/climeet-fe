import { PartyDetailType, usePartyDetailSuspense } from '@/services/party'
import { PartyMainInfo } from './PartyMainInfo'
import { PartyParticipants } from './PartyParticipants'
import { PartyLocation } from './PartyLocation'
// import { PartyClimbInfo } from './PartyClimbInfo'

export default function PartyDetail({ data }: { data: PartyDetailType }) {
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

PartyDetail.Query = function Container({ id }: { id: number }) {
  const { data } = usePartyDetailSuspense(id)
  return <PartyDetail data={data} />
}

PartyDetail.Retry = () => {
  return (
    <div>
      <h1>파티 정보를 불러오는데 실패했습니다.</h1>
      <button onClick={() => window.location.reload()}>다시 시도</button>
    </div>
  )
}

PartyDetail.Skeleton = () => {
  return (
    <div>
      <h1>로딩중!~~</h1>
    </div>
  )
}
