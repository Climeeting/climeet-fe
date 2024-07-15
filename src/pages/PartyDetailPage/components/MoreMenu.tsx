import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { delete_party_$partyId, usePartyDetail } from '@/services/party'
import { useIsLogin, useMyProfile } from '@/services/user'
import Icon from '@/components/Icon/Icon'
import Dialog from '@/components/Dialog'
import Dropdown from '@/components/Dropdown'

export default function MoreMenu({ id }: { id?: string }) {
  const navigate = useNavigate()
  const isLogin = useIsLogin()
  const [openDropdown, onOpenDropdown] = useState(false)
  const [openAlertLogin, onOpenAlertLogin] = useState(false)
  const [openAlertDelete, onOpenAlertDelete] = useState(false)

  const { data: partyData } = usePartyDetail(Number(id))
  const { data: myData } = useMyProfile()

  // TODO: 임시로 작성자 이름으로 비교.
  const isMaster = partyData?.masterName === myData?.nickname

  if (!id || !isMaster) return null

  return (
    <>
      <Dropdown open={openDropdown} onOpenChange={onOpenDropdown}>
        <Dropdown.Trigger>
          <Icon icon="More" />
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>
            <p>파티 수정하기</p>
            <Icon size="16" icon="Pencil" />
          </Dropdown.Item>

          <Dropdown.Item
            onSelect={() => {
              onOpenDropdown(false)
              if (isLogin) onOpenAlertDelete(true)
              if (!isLogin) onOpenAlertLogin(true)
            }}
          >
            <p>파티 삭제하기</p>
            <Icon size="16" icon="Remove" />
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>

      <Dialog open={openAlertLogin} onOpenChange={onOpenAlertLogin}>
        <Dialog.Content onAction={() => navigate('/login')}>
          로그인이 필요한 서비스입니다.
          <br />
          로그인 하시겠습니까?
        </Dialog.Content>
      </Dialog>

      <Dialog open={openAlertDelete} onOpenChange={onOpenAlertDelete}>
        <Dialog.Content
          onAction={async () => {
            try {
              await delete_party_$partyId(Number(id))
              navigate(-1)
            } catch (e) {
              console.error(e)
            }
          }}
        >
          정말 삭제하시겠습니까?
        </Dialog.Content>
      </Dialog>
    </>
  )
}
