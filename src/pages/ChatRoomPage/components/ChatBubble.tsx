import dayjs from 'dayjs'
import styles from './ChatBubble.module.scss'
import Avatar from '@/components/Avatar.tsx'
import classNames from 'classnames'
import { ReceiveMessage } from '@/utils/chat'

export type ChatBubbleProps = ReceiveMessage & {
  isStartMessage: boolean
  isMyMessage: boolean
  isLastMessage: boolean
}

export default function ChatBubble ({
  messageType,
  name,
  thumbnailImageUrl,
  message,
  createdAt,
  isStartMessage,
  isMyMessage,
  isLastMessage,
}: ChatBubbleProps) {
  if (messageType === 'SERVER') {
    return (
      <div className={classNames(styles.SystemMessageLayout, {
        [styles.isStartMessage]: isStartMessage,
      })}
      >
        <div className={styles.SystemMessage}>{message}</div>
      </div>
    )
  }

  if (isMyMessage) {
    return (
      <div className={classNames(styles.MyMessageContainer, {
        [styles.isStartMessage]: isStartMessage,
      })}
      >
        <div className={styles.MyMessage}>
          {isLastMessage && <div className={styles.SendTime}>{dayjs(createdAt).format('A h:mm')}</div>}
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
      <div className={styles.OtherMessage}>
        {isStartMessage && (
          <Avatar src={thumbnailImageUrl} alt={name} size='small' className={styles.MemberAvatar} />
        )}
        <div>
          {isStartMessage && <div className={styles.MemberName}>{name}</div>}
          <div
            className={classNames(styles.MessageItem, {
              [styles.singleMessage]: !isStartMessage,
            })}
          >
            {message}
          </div>
        </div>
        {isLastMessage && <div className={styles.SendTime}>{dayjs(createdAt).format('A h:mm')}</div>}
      </div>
    </div>
  )
}
