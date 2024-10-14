import styles from './PartyLocation.module.scss'
import { PartyDetailType } from '@/services/party'
import { useClimbingGym } from '@/services/gym'
import { useKakaoStaticMap } from '@/utils/useKakaoMap'
import Icon from '@/components/Icon/Icon'
import useToast from '@/utils/useToast.tsx'
import Skeleton from 'react-loading-skeleton'

export function PartyLocation ({ locationId, gymName, location }: PartyDetailType) {
  const toast = useToast()

  return (
    <>
      <h2 className={styles.Title}>위치 정보</h2>
      <KakaoMap locationId={locationId} />
      <div className={styles.Info}>
        <h3 className={styles.Name}>{gymName}</h3>
        <button>
          <div className={styles.SubInfo}>
            {location}
            <button onClick={() => {
              if (!location) return
              window.navigator.clipboard.writeText(location).then(() => {
                toast.add({
                  message: '클립보드에 복사되었어요.',
                })
              })
            }}
            >
              <Icon icon='Copy' size='16' />
            </button>
          </div>
        </button>
      </div>
    </>
  )
}

function KakaoMap ({ locationId }: { locationId: number }) {
  const {
    data: { name, address1, address2, address3 },
  } = useClimbingGym(locationId)

  const { mapRef } = useKakaoStaticMap({ name, address: `${address1} ${address2} ${address3}` })

  return (
    <div ref={mapRef} className={styles.KakaoMap}>
      <div className={styles.ViewLargerMap}>
        <span>지도보기</span>
        <Icon icon='ViewLarger' size={12} />
      </div>
    </div>
  )
}

PartyLocation.Skeleton = function PartyLocationSkeleton () {
  return (
    <>
      <h2 className={styles.Title}>위치 정보</h2>

      <div className={styles.KakaoMap}>
        <Skeleton width='100%' height='100%' />
        <div className={styles.ViewLargerMap}>
          <Icon icon='ViewLarger' size={12} />
        </div>
      </div>
      <div className={styles.Info}>
        <div className={styles.Name}>
          <Skeleton width={200} height={24} borderRadius={12} />
        </div>
        <div>
          <div className={styles.SubInfo}>
            <Skeleton width={230} height={16} borderRadius={8} />
            <Icon icon='Copy' size='16' />
          </div>
        </div>
      </div>
    </>
  )
}
