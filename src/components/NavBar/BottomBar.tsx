import styles from './BottomBar.module.scss'
import Icon from '../Icon/Icon'
import classNames from 'classnames'
import { useStack } from '@stackflow/react'

const navigations = [
  { icon: 'HomeFilled', title: '홈', page: 'HomePage' },
  { icon: 'LocationLine', title: '탐색', page: null },
  { icon: 'Plus', title: '만들기', page: null },
  { icon: 'ChatLine', title: '채팅', page: null },
  { icon: 'MyPage', title: '마이페이지', page: 'MyPage' },
] as const

export default function BottomBar() {
  const { activities } = useStack()

  const topActivity = activities.find((activity) => activity.isTop)

  return (
    <div className={styles.container}>
      {navigations.map((nav, index) => (
        <button
          key={index}
          className={classNames(styles.item, {
            [styles.active]: nav.page === topActivity?.name,
          })}
        >
          <Icon icon={nav.icon} size={24} />
          <span>{nav.title}</span>
        </button>
      ))}
    </div>
  )
}
