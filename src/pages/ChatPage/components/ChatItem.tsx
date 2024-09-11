import styles from './ChatItem.module.scss'
import Avatar from '@/components/Avatar.tsx'
import { ChatRoomDto } from '@/services/user'
import dayjs from 'dayjs'

export default function ChatItem ({
  data,
}: {
  data: ChatRoomDto
}) {
  return (
    <div className={styles.ChatItem}>
      <div className={styles.Left}>
        <Avatar src={data.chatThumbnail} alt='아바타' className={styles.Avatar} />
        <div className={styles.RoomInfo}>
          <div className={styles.RoomTitle}>
            <div className={styles.RoomName}>파티 이름 (작업 필요)</div>
            <div className={styles.Members}>{data.memberCount}</div>
          </div>
          <div className={styles.LastMessage}>{data.lastMessage}</div>
        </div>
      </div>
      <div className={styles.Right}>
        {data.lastMessageTime && <div className={styles.LastChatTime}>{dayjs(data.lastMessageTime).format('A hh:mm')}</div>}
        {data.hasUnreadMessages && <div className={styles.Chip}>1</div>}
      </div>
    </div>
  )
}
