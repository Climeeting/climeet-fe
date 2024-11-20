import Icon from '@/components/Icon/Icon.tsx'
import { usePartyDetail } from '@/services/party'
import useToast from '@/utils/useToast'

export default function Share ({ id }: { id?: string }) {
  const { data: partyData } = usePartyDetail(Number(id))
  const toast = useToast()

  return (
    <div onClick={() => {
      if (!window.navigator.share) {
        window.navigator.clipboard.writeText(window.location.href).then(() => {
          toast.add({
            message: '클립보드에 복사되었어요.',
          })
        })
      } else {
        window.navigator.share({
          title: `클라이밋 | ${partyData?.partyName}`,
          url: window.location.href,
        })
      }
    }}
    >
      <Icon icon='Share' size={24} />
    </div>
  )
}
