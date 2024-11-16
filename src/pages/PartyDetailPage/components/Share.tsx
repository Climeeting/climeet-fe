import Icon from '@/components/Icon/Icon.tsx'
import { usePartyDetail } from '@/services/party'

export default function Share ({ id }: { id?: string }) {
  const { data: partyData } = usePartyDetail(Number(id))

  return (
    <div onClick={() => {
      window.navigator.share({
        title: `클라이밋 | ${partyData?.partyName}`,
        text: partyData?.partyDescription,
        url: window.location.href,
      })
    }}
    >
      <Icon icon='Share' size={24} />
    </div>
  )
}
