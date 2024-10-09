import Avatar from '@/components/Avatar'
import { useMyProfileSuspense, useUserProfileSuspense } from '@/services/user'
import styles from './Profile.module.scss'
import { Link } from 'react-router-dom'
import Icon from '@/components/Icon/Icon'
import { PropsWithChildren } from 'react'
import { MyProfile } from '@/pages/types/api'
import { get_oauth_logout } from '@/services/oauth'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import useDelaySkeleton from '@/utils/useDelaySkeleton'

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
  const isShow = useDelaySkeleton()

  if (!isShow) return null

  return (
    <SkeletonTheme baseColor='#f6f6f6' highlightColor='#fff'>
      <div className={styles.Skeleton}>
        <div style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          width: '100%',
          marginBottom: 16,
        }}
        >
          <Skeleton circle={true} width={54} height={54} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 12,
            width: '100%',
            gap: 4,
          }}
          >
            <Skeleton width={46} height={27} borderRadius={13} />
            <Skeleton width={68} height={20} borderRadius={10} />
          </div>
        </div>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
        }}
        >
          <Skeleton width='100%' height={22} borderRadius={11} />
          <Skeleton width='90%' height={22} borderRadius={11} />
          <Skeleton width='100%' height={22} borderRadius={11} />
          <Skeleton width='70%' height={22} borderRadius={11} />
        </div>
      </div>
    </SkeletonTheme>
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
