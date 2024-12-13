import SideSheet from '@/components/SideSheet.tsx'
import styles from './ChatSidebar.module.scss'
import Icon from '@/components/Icon/Icon.tsx'
import Avatar from '@/components/Avatar.tsx'
import { Member, post_chat_leave_$roomId } from '@/services/chat'
import { PartyDetailType } from '@/services/party'
import { UserChatRoomsQuery, useMyProfile } from '@/services/user'
import { Link, useNavigate } from 'react-router-dom'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import useToast from '@/utils/useToast'

export default function ChatSidebar ({ partyId, party, members }: { partyId: number, party: PartyDetailType, members: Member[] }) {
  const { data: my } = useMyProfile()

  const myInfo = members.find(member => member.userId === my?.userId)
  const memberList = myInfo ? [myInfo, ...members.filter(member => member.userId !== my?.userId)] : members
  const toast = useToast()
  const navigate = useNavigate()

  return (
    <SideSheet.Content>
      <div className={styles.Container}>
        <div className={styles.Top}>
          <div className={styles.Title}>
            <div className={styles.TitleText}>{party.partyName}</div>
          </div>
          <div className={styles.MemberInfo}>
            <h2 className={styles.MemberInfoTitle}>파티 멤버</h2>
            <div className={styles.MemberList}>
              {memberList.map(member => (
                <MemberItem
                  key={member.userId}
                  isMaster={party.masterId === member.userId}
                  isMe={my?.userId === member.userId}
                  {...member}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.Banner}>
          <PartyBanner partyId={partyId} party={party} />
        </div>
        <div className={styles.Footer}>
          <button
            className={styles.Button}
            onClick={async () => {
              try {
                await post_chat_leave_$roomId(partyId)
                toast.add({
                  message: '채팅방을 나갔습니다.',
                })
                navigate('/chat', { replace: true })
                UserChatRoomsQuery.refetch()
              } catch (e) {
                if (e instanceof Error) {
                  toast.add({
                    message: e.message,
                  })
                } else {
                  toast.add({
                    message: '채팅방 나가기에 실패하였습니다.',
                  })
                }
              }
            }}
          >
            <div className={styles.ExitText}>채팅방 나가기</div>
            <Icon icon='Exit' size={20} />
          </button>
        </div>
      </div>
    </SideSheet.Content>
  )
}

function MemberItem ({
  isMaster, isMe, userId, memberName, memberThumbnail,
}: Member & { isMe: boolean, isMaster: boolean }) {
  return (
    <Link to={`/user/${userId}`} className={styles.Member}>
      <Avatar src={memberThumbnail} alt='아바타' size='small' className={styles.Avatar} />
      {isMaster && (
        <div className={styles.Master}>
          <VisuallyHidden>방장</VisuallyHidden>
          <Icon icon='Crown' size={16} />
        </div>
      )}
      <div className={styles.MemberName}>{memberName}</div>
      {isMe && <div className={styles.Chip}>나</div>}
    </Link>
  )
}

function PartyBanner ({ partyId, party }: { partyId: number, party: PartyDetailType }) {
  return (
    <Link to={`/party/${partyId}`} className={styles.PartyBanner}>
      {party.partyImageUrl && (
        <div className={styles.Image}>
          <img src={party.partyImageUrl} alt={party.partyName} />
        </div>
      )}
      <div className={styles.Contents}>
        <span className={styles.Time}>{party.appointmentTime}</span>
        <h2 className={styles.Name}>{party.partyName}</h2>
      </div>
      <Icon className={styles.Icon} icon='ArrowRight' size='16' />
    </Link>
  )
}
