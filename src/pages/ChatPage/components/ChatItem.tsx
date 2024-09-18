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
      <Avatar src={data.chatThumbnail} alt='아바타' className={styles.Avatar} />
      <div className={styles.RoomInfo}>
        <div className={styles.Row}>
          <div className={styles.RoomTitle}>
            <h2 className={styles.RoomName}>{data.roomTitle}</h2>
            <span className={styles.Members}>{data.memberCount}</span>
          </div>
          {data.hasUnreadMessages && <div className={styles.NewChat} />}
        </div>
        <div className={styles.Row}>
          <div className={styles.LastMessage}>{data.lastMessage}</div>
          {data.lastMessageTime && <div className={styles.LastChatTime}>{dayjs(data.lastMessageTime).format('A hh:mm')}</div>}
        </div>
      </div>
    </div>
  )
}
