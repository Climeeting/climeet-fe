import Dialog from '@/components/Dialog/Dialog'
import { useNavigate } from 'react-router-dom'

export default function LoginDialog ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const navigate = useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content onAction={() => navigate(`/login?redirect=${location.pathname}`)}>
        로그인이 필요한 서비스입니다.
        <br />
        로그인 하시겠습니까?
      </Dialog.Content>
    </Dialog>
  )
}
