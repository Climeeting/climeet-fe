import styles from './ChatItem.module.scss'
import Avatar from '@/components/Avatar.tsx'
import { PartyListDto } from '@/services/user'

export default function ChatItem ({
  data,
}: {
  data: PartyListDto
}) {
  return (
    <div className={styles.ChatItem}>
      <div className={styles.Left}>
        <Avatar src='' alt='아바타' className={styles.Avatar} />
        <div className={styles.RoomInfo}>
          <div className={styles.RoomTitle}>
            <div className={styles.RoomName}>{data.partyTitle}</div>
            <div className={styles.Members}>{data.currentTotalMemberCount}</div>
          </div>
          <div className={styles.LastMessage}>최근 대화 메세지 (개발 필요)</div>
        </div>
      </div>
      <div className={styles.Right}>
        <div className={styles.LastChatTime}>오전 8:42 (개발 필요)</div>
        {/* <div className={styles.Chip}>1</div> */}
      </div>
    </div>
  )
}
