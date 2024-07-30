import { useNavigate } from 'react-router-dom'
import styles from './ChatItem.module.scss'
import Avatar from '@/components/Avatar.tsx'

export default function ChatItem() {
  const navigate = useNavigate()

  return (
    <div
      className={styles.ChatItem}
      onClick={() => {
        navigate('/chat/1')
      }}
    >
      <div className={styles.Left}>
        <Avatar src={''} alt={'아바타'} className={styles.Avatar} />
        <div className={styles.RoomInfo}>
          <div className={styles.RoomTitle}>
            <div className={styles.RoomName}>친해지실 분 구해유</div>
            <div className={styles.Members}>9</div>
          </div>
          <div className={styles.LastMessage}>안녕하세요 친해져요~</div>
        </div>
      </div>
      <div className={styles.Right}>
        <div className={styles.LastChatTime}>오전 8:42</div>
        <div className={styles.Chip}>12</div>
      </div>
    </div>
  )
}
