import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { delete_party_$partyId, delete_party_$partyId_leave, usePartyDetail } from '@/services/party'
import { useIsLogin } from '@/services/user'
import Icon from '@/components/Icon/Icon'
import Dialog from '@/components/Dialog/Dialog'
import Dropdown from '@/components/Dropdown'
import useToast from '@/utils/useToast.tsx'

export default function MoreMenu ({ id }: { id?: string }) {
  const navigate = useNavigate()
  const { data: isLogin } = useIsLogin()
  const [openDropdown, onOpenDropdown] = useState(false)
  const [openAlertLogin, onOpenAlertLogin] = useState(false)
  const [openAlertDelete, onOpenAlertDelete] = useState(false)
  const [openAlertEdit, onOpenAlertEdit] = useState(false)
  const [openAlertLeave, onOpenAlertLeave] = useState(false)
  const handlePartyReportClick = () => {
    onOpenDropdown(false)
    if (!isLogin) {
      return onOpenAlertLogin(true)
    }
    navigate(`/party/report/${id}`)
  }

  const { data: partyData } = usePartyDetail(Number(id))

  if (!id || !partyData) return null

  const isMaster = partyData.isMaster
  const isParticipation = !partyData.isMaster && partyData.isParticipation
  const isNotParticipation = !partyData.isMaster && !partyData.isParticipation

  const toast = useToast()

  return (
    <>
      <Dropdown open={openDropdown} onOpenChange={onOpenDropdown}>
        <Dropdown.Trigger>
          <Icon icon='More' />
        </Dropdown.Trigger>
        {
          isMaster && (
            <Dropdown.Content>
              <Dropdown.Item
                onSelect={() => {
                  onOpenDropdown(false)
                  if (!isLogin) {
                    return onOpenAlertLogin(true)
                  }
                  const isExistParticipant = partyData.currentParticipants > 1
                  if (isExistParticipant) {
                    return onOpenAlertEdit(true)
                  }
                  navigate(`/party-suervey/${id}`)
                }}
              >
                <p>파티 수정하기</p>
                <Icon size='16' icon='Pencil' />
              </Dropdown.Item>

              <Dropdown.Item
                onSelect={() => {
                  onOpenDropdown(false)
                  if (isLogin) onOpenAlertDelete(true)
                  if (!isLogin) onOpenAlertLogin(true)
                }}
              >
                <p>파티 삭제하기</p>
                <Icon size='16' icon='Remove' />
              </Dropdown.Item>
            </Dropdown.Content>
          )
        }

        {
          isParticipation && (
            <Dropdown.Content>
              <Dropdown.Item
                onSelect={handlePartyReportClick}
              >
                <p>파티 신고하기</p>
                <Icon size='16' icon='Report' />
              </Dropdown.Item>

              <Dropdown.Item
                onSelect={() => {
                  onOpenDropdown(false)
                  if (isLogin) onOpenAlertLeave(true)
                  if (!isLogin) onOpenAlertLogin(true)
                }}
              >
                <p>파티 탈퇴하기</p>
                <Icon size='16' icon='Exit' />
              </Dropdown.Item>
            </Dropdown.Content>
          )
        }

        {
          isNotParticipation && (
            <Dropdown.Content>
              <Dropdown.Item
                onSelect={() => {
                  if (isLogin) handlePartyReportClick()
                  if (!isLogin) onOpenAlertLogin(true)
                }}
              >
                <p>파티 신고하기</p>
                <Icon size='16' icon='Report' />
              </Dropdown.Item>
            </Dropdown.Content>
          )
        }
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
              toast.add({
                message: '파티가 삭제되었습니다.',
              })
            } catch (e) {
              if (e instanceof Error) {
                toast.add({
                  message: e.message,
                })
              }
            }
          }}
        >
          정말 삭제하시겠습니까?
        </Dialog.Content>
      </Dialog>

      <Dialog open={openAlertEdit} onOpenChange={onOpenAlertEdit}>
        <Dialog.Content
          onAction={() => {
            navigate(`/party-suervey/${id}`)
          }}
        >
          참가자가 있는 경우에<br />제한된 정보만 수정 가능합니다.
        </Dialog.Content>
      </Dialog>

      <Dialog open={openAlertLeave} onOpenChange={onOpenAlertLeave}>
        <Dialog.Content
          hasCancel
          onAction={async () => {
            try {
              await delete_party_$partyId_leave(Number(id))
              navigate('/')
              toast.add({
                message: '파티를 탈퇴하였습니다.',
              })
            } catch (e) {
              if (e instanceof Error) {
                toast.add({
                  message: e.message,
                })
              }
            }
            onOpenAlertLeave(false)
          }}
          onClose={() => {
            onOpenAlertLeave(false)
          }}
        >
          정말로 탈퇴하시겠습니까?
          <br />
          탈퇴 시 파티와 관련된 모든 데이터가 삭제되며
          <br />
          서비스 이용의 제한을 받을 수 있습니다
        </Dialog.Content>
      </Dialog>
    </>
  )
}
