import Dialog from '@/components/Dialog/Dialog'
import { useNavigate } from 'react-router-dom'

export default function AdditionalInfoDialog({
  open,
  onOpenChange,
  hasCancel = true,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  hasCancel?: boolean
}) {
  const navigate = useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        hasCancel={hasCancel}
        onAction={() => navigate(`/user/my/new?redirect=${location.pathname}`)}
      >
        파티에 참여하기 위해서는
        <br />
        추가정보 입력이 필요합니다.
      </Dialog.Content>
    </Dialog>
  )
}
