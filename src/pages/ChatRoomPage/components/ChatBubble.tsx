import dayjs from 'dayjs'
import styles from './ChatBubble.module.scss'
import Avatar from '@/components/Avatar.tsx'
import classNames from 'classnames'
import { ChatMessage } from '@/services/chat'

export type ChatBubbleProps = ChatMessage & {
  isStartMessage: boolean
  isMyMessage: boolean
  isLastMessage: boolean
}

export default function ChatBubble ({
  messageType,
  senderId,
  message,
  createdAt,
  isStartMessage,
  isMyMessage,
  isLastMessage,
}: ChatBubbleProps) {
  const user = {
    id: senderId,
    name: '테스트',
    avatar: 'https://avatars.githubusercontent.com/u/44080404?v=4',
  }

  if (messageType === 'SERVER') {
    return (
      <div className={styles.SystemMessageLayout}>
        <div className={styles.SystemMessage}>{message}</div>
      </div>
    )
  }

  if (isMyMessage) {
    return (
      <div className={styles.MyMessageContainer}>
        {isLastMessage && <div className={styles.SendTime}>{dayjs(createdAt).format('A h:mm')}</div>}
        <div className={styles.MyMessageList}>
          <div className={styles.MessageItem}>{message}</div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={classNames(styles.OtherMessageContainer, {
        [styles.isStartMessage]: isStartMessage,
      })}
    >
      {isStartMessage && (
        <Avatar src={user.avatar} alt={user.name} size='small' className={styles.MemberAvatar} />
      )}
      <div>
        {isStartMessage && <div className={styles.MemberName}>{user.name}</div>}
        <div
          className={classNames(styles.MessageItem, {
            [styles.singleMessage]: !isStartMessage,
          })}
        >
          {message}
        </div>
      </div>
      {isLastMessage && <div className={styles.SendTime}>{dayjs(createdAt).format('A h:MM')}</div>}
    </div>
  )
}
