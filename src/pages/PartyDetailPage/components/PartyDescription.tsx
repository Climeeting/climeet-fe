import styles from './PartyDescription.module.scss'
import Avatar from '@/components/Avatar'

export function PartyDescription() {
  return (
    <>
      <h2 className={styles.Title}>파티 소개</h2>
      <div className={styles.UserInfo}>
        <div className={styles.Profile}>
          <Avatar size="middle" src="" alt="이성진" />
          <span>이성진</span>
        </div>
        님이 진행하는 파티입니다.
      </div>
      <div className={styles.Divider} />
      <p className={styles.Description}>
        안녕하세요, 클라이밍을 즐기는 분들을 위한 파티를 모집합니다! 함께 즐거운 시간 보내며 도전과
        성취를 느껴보세요. 날짜와 장소는 함께 정하고, 모두가 즐겁고 안전하게 활동할 수 있도록
        노력하겠습니다.
      </p>
    </>
  )
}
