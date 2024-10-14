import SideSheet from '@/components/SideSheet.tsx'
import styles from './ChatSidebar.module.scss'
import Icon from '@/components/Icon/Icon.tsx'
import Avatar from '@/components/Avatar.tsx'
import { Member } from '@/services/chat'
import { PartyDetailType } from '@/services/party'
import { useMyProfile } from '@/services/user'
import { Link } from 'react-router-dom'

export default function ChatSidebar ({ partyId, party, members }: { partyId: number, party: PartyDetailType, members: Member[] }) {
  const { data: my } = useMyProfile()

  const myInfo = members.find(member => member.userId === my?.userId)
  const memberList = myInfo ? [myInfo, ...members.filter(member => member.userId !== my?.userId)] : members

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
          <div className={styles.ExitText}>채팅방 나가기</div>
          <button>
            <Icon icon='Exit' size={20} />
          </button>
        </div>
      </div>
    </SideSheet.Content>
  )
}

function MemberItem ({ isMaster, isMe, memberName, memberThumbnail }: Member & { isMe: boolean, isMaster: boolean }) {
  return (
    <div className={styles.Member}>
      <Avatar src={memberThumbnail} alt='아바타' size='small' className={styles.Avatar} />
      <div className={styles.MemberName}>{memberName}</div>
      {isMaster && <div className={styles.Chip}>방장</div>}
      {isMe && <div className={styles.Chip}>나</div>}
    </div>
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
