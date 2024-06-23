import { usePartyDetail } from '@/services/party'
import { PartyMainInfo } from './PartyMainInfo'
import { PartyDescription } from './PartyDescription'
import { PartyParticipants } from './PartyParticipants'
// import { PartyClimbInfo } from './PartyClimbInfo'

export default function PartyDetail({ id }: { id: number }) {
  const { data } = usePartyDetail(id)

  return (
    <>
      <section>
        <PartyMainInfo {...data} />
      </section>

      <section>
        <PartyDescription {...data} />
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
