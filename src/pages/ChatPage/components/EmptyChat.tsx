import styles from './EmptyChat.module.scss'
import emptyChat from '@/assets/empty_chat.png'

export default function EmptyChat() {
  return (
    <div className={styles.EmptyChat}>
      <img src={emptyChat} alt={'empty-chat-img'} />
      <div className={styles.EmptyChatText}>
        참여중인 채팅이 없습니다.
        <br />
        파티에 참가하고 파티원과 대화를 나눠보세요!
      </div>
      <button className={styles.Button}>파티 목록 보기</button>
    </div>
  )
}
