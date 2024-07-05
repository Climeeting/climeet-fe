import Avatar from '@/components/Avatar'
import { useMyProfile } from '@/services/user'
import styles from './Profile.module.scss'
import { Link } from 'react-router-dom'
import Icon from '@/components/Icon/Icon'
import { PropsWithChildren } from 'react'

export default function Profile({ isMine }: { isMine: boolean }) {
  const {
    data: { profileImageUrl, nickname, skillLevel, description },
  } = useMyProfile()

  return (
    <>
      <ProfileContainer isMine={isMine}>
        <Avatar className={styles.Avatar} src={profileImageUrl} size="large" alt={nickname} />
        <div className={styles.ProfileInfo}>
          <span className={styles.Name}>{nickname}</span>
          {skillLevel && <span>{skillLevel} 클라이머</span>}
        </div>
      </ProfileContainer>
      <div className={styles.Description}>{description}</div>
    </>
  )
}

function ProfileContainer({ isMine, children }: { isMine: boolean } & PropsWithChildren) {
  if (isMine) {
    return (
      <Link to={'/user/my/update'} className={styles.Container}>
        {children}
        <Icon icon="ArrowRight" size="16" className={styles.Icon} />
      </Link>
    )
  }
  return <div className={styles.Container}>{children}</div>
}
