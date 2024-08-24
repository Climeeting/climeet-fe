import Avatar from '@/components/Avatar'
import { useMyProfileSuspense, useUserProfileSuspense } from '@/services/user'
import styles from './Profile.module.scss'
import { Link } from 'react-router-dom'
import Icon from '@/components/Icon/Icon'
import { PropsWithChildren } from 'react'
import { MyProfile } from '@/pages/types/api'
import { get_oauth_logout } from '@/services/oauth'

export default function Profile ({ isMine = false, data }: { isMine: boolean, data: MyProfile }) {
  const { profileImageUrl, nickname, skillLevel, description } = data

  return (
    <>
      <ProfileContainer isMine={isMine}>
        <Avatar className={styles.Avatar} src={profileImageUrl} size='large' alt={nickname} />
        <div className={styles.ProfileInfo}>
          <span className={styles.Name}>{nickname}</span>
          {skillLevel && <span>{skillLevel} 클라이머</span>}
        </div>
      </ProfileContainer>
      <div className={styles.Description}>{description}</div>
      {isMine && (
        <button
          onClick={async () => {
            await get_oauth_logout()
            window.location.href = '/'
          }}
        >
          로그아웃
        </button>
      )}
    </>
  )
}

Profile.Skeleton = function ProfileSkeleton () {
  return (
    <>
      <ProfileContainer isMine={false}>
        로딩중
        <div className={styles.ProfileInfo}>
          <span className={styles.Name} />
          <span />
        </div>
      </ProfileContainer>
      <div className={styles.Description} />
    </>
  )
}

Profile.Query = function ProfileQuery ({ isMine = false, id }: { isMine: boolean, id: number }) {
  if (isMine) return <MyProfileQuery />
  return <UserProfileQuery id={id} />
}

function MyProfileQuery () {
  const { data } = useMyProfileSuspense()
  return <Profile isMine data={data} />
}

function UserProfileQuery ({ id }: { id: number }) {
  const { data } = useUserProfileSuspense(id)
  return <Profile isMine={false} data={data} />
}

Profile.Retry = function ProfileRetry () {
  return (
    <div>
      <h1>프로필 정보를 불러오는데 실패했습니다.</h1>
      <button onClick={() => window.location.reload()}>다시 시도</button>
    </div>
  )
}

function ProfileContainer ({ isMine, children }: { isMine: boolean } & PropsWithChildren) {
  if (isMine) {
    return (
      <Link to='/user/my/update' className={styles.Container}>
        {children}
        <Icon icon='ArrowRight' size='16' className={styles.Icon} />
      </Link>
    )
  }
  return <div className={styles.Container}>{children}</div>
}
