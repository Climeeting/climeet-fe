import styles from './BottomBar.module.scss'
import Icon, { IconType } from '../Icon/Icon'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

export default function BottomBar () {
  const { pathname } = useLocation()

  return (
    <div className={styles.container}>
      <NavLink
        icon={['HomeFilled', 'Home']}
        title='홈'
        to='/'
        isActive={pathname === '/'}
      />
      <NavLink
        icon={['LocationFill', 'LocationLine']}
        title='탐색'
        to='/location'
        isActive={pathname === '/location'}
      />
      <NavLink
        icon={['Plus', 'Plus']}
        title='만들기'
        to='/party-suervey'
        isActive={pathname === '/party-suervey'}
      />
      <NavLink
        icon={['ChatFilled', 'ChatLine']}
        title='채팅'
        to='/chat'
        isActive={pathname.includes('/chat')}
      />
      <NavLink
        icon={['MyPage', 'MyPageInactive']}
        title='My'
        to='/user/my'
        isActive={pathname.includes('/user/')}
      />
    </div>
  )
}

function NavLink ({ icon, title, to, isActive }: {
  icon: [IconType, IconType] // [active, notActive]
  title: string
  isActive: boolean
  to: string
}) {
  return (
    <Link
      to={to}
      className={classNames(styles.item, {
        [styles.active]: isActive,
      })}
    >
      <Icon icon={isActive ? icon[0] : icon[1]} size={24} />
      <span>{title}</span>
    </Link>
  )
}
