import dayjs from 'dayjs'
import styles from './ChatBubble.module.scss'
import Avatar from '@/components/Avatar.tsx'
import classNames from 'classnames'

export type ChatInfo = {
  user: {
    avatar: string
    name: string
    id: number
  }
  message: string
  time: string
}

export type ChatBubbleProps = ChatInfo & {
  isStartMessage: boolean
  isMyMessage: boolean
  isLastMessage: boolean
}

export default function ChatBubble({
  user,
  message,
  time,
  isStartMessage,
  isMyMessage,
  isLastMessage,
}: ChatBubbleProps) {
  if (isMyMessage) {
    return (
      <div className={styles.MyMessageContainer}>
        {isLastMessage && <div className={styles.SendTime}>{dayjs(time).format('A h:MM')}</div>}
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
        <Avatar src={user.avatar} alt={user.name} size={'small'} className={styles.MemberAvatar} />
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
      {isLastMessage && <div className={styles.SendTime}>{dayjs(time).format('A h:MM')}</div>}
    </div>
  )
}
