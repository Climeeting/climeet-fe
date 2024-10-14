import styles from './ChatItem.module.scss'
import Avatar from '@/components/Avatar.tsx'
import { ChatRoomDto } from '@/services/user'
import dayjs from 'dayjs'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function ChatItem ({
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
          <div className={styles.LastChatTime}>{
            dayjs(data.lastMessageTime).calendar()
          }
          </div>
        </div>
        {data.lastMessageTime && (
          <div className={styles.Row}>
            <div className={styles.LastMessage}>{data.lastMessage}</div>
            {data.hasUnreadMessages && <div className={styles.NewChat} />}
          </div>
        )}
      </div>
    </div>
  )
}

ChatItem.Skeleton = function ChatItemSkeleton () {
  return (
    <SkeletonTheme baseColor='#f6f6f6' highlightColor='#fff'>
      <div className={styles.Skeleton}>
        <Skeleton circle={true} width={52} height={52} />
        <div className={styles.RoomInfo}>
          <Skeleton width='60%' height={16} borderRadius={6} />
          <Skeleton width={80} height={16} borderRadius={6} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default ChatItem
