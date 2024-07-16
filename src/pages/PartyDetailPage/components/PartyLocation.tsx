import styles from './PartyLocation.module.scss'
import { PartyDetailType } from '@/services/party'
import { useClimbingGym } from '@/services/gym'
import { useKakaoStaticMap } from '@/utils/useKakaoMap'
import Icon from '@/components/Icon/Icon'

export function PartyLocation({ locationId, gymName }: PartyDetailType) {
  return (
    <>
      <h2 className={styles.Title}>위치 정보</h2>
      <KakaoMap locationId={locationId} />
      <div className={styles.Info}>
        <h3 className={styles.Name}>{gymName}</h3>
        <button>
          <div className={styles.SubInfo}>
            (임시 주소)서울 영등포구 문래로 164 SK리더스뷰 B동 1층
            <Icon icon="Copy" size="16" />
          </div>
        </button>
      </div>
    </>
  )
}

function KakaoMap({ locationId }: { locationId: number }) {
  const {
    data: { name, address1, address2, address3 },
  } = useClimbingGym(locationId)

  const { mapRef } = useKakaoStaticMap({ name, address: `${address1} ${address2} ${address3}` })

  return <div ref={mapRef} className={styles.KakaoMap}></div>
}
