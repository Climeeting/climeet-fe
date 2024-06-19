import styles from './BottomBar.module.scss'
import Icon, { IconType } from '../Icon/Icon'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

export default function BottomBar() {
  return (
    <div className={styles.container}>
      <NavLink icon="HomeFilled" title="홈" to="/" />
      <NavLink icon="LocationLine" title="탐색" to="/location" />
      <NavLink icon="Plus" title="만들기" to="/party-suervey" />
      <NavLink icon="ChatLine" title="채팅" to="/chat" />
      <NavLink icon="MyPage" title="마이페이지" to="/mypage" />
    </div>
  )
}

function NavLink({ icon, title, to }: { icon: string; title: string; to: string }) {
  const { pathname } = useLocation()

  return (
    <Link
      to={to}
      className={classNames(styles.item, {
        [styles.active]: pathname === to,
      })}
    >
      <Icon icon={icon as IconType} size={24} />
      <span>{title}</span>
    </Link>
  )
}
