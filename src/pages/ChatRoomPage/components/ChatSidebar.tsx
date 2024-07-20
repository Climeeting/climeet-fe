import SideSheet from '@/components/SideSheet.tsx'
import styles from './ChatSidebar.module.scss'
import Icon from '@/components/Icon/Icon.tsx'
import Avatar from '@/components/Avatar.tsx'

export default function ChatSidebar() {
  return (
    <SideSheet.Content>
      <div className={styles.Container}>
        <div className={styles.Top}>
          <div className={styles.Title}>
            <div className={styles.TitleText}>친해지실 분 구해유</div>
            <button className={styles.Alarm}>
              <Icon icon={'Alarm'} size={20} />
            </button>
          </div>
          <div className={styles.MemberInfo}>
            <div className={styles.MemberInfoTitle}>파티 멤버</div>
            <div className={styles.MemberList}>
              {Array.from({ length: 10 }).map(() => (
                <Member />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.Footer}>
          <div className={styles.ExitText}>채팅방 나가기</div>
          <button>
            <Icon icon={'Exit'} size={20} />
          </button>
        </div>
      </div>
    </SideSheet.Content>
  )
}

function Member() {
  return (
    <div className={styles.Member}>
      <Avatar src={''} alt={'아바타'} size={'small'} className={styles.Avatar} />
      <div className={styles.MemberName}>김준영</div>
      <div className={styles.Chip}>나</div>
    </div>
  )
}
