import styles from './BottomBar.module.scss'
import Icon, { IconType } from '../Icon/Icon'
import classNames from 'classnames'
import { useStack } from '@stackflow/react'
import { useFlow } from '@/pages/stackflow'

export default function BottomBar() {
  const { push } = useFlow()

  return (
    <div className={styles.container}>
      <NavButton
        icon="HomeFilled"
        title="홈"
        page="HomePage"
        onClick={() => push('HomePage', {})}
      />
      <NavButton icon="LocationLine" title="탐색" />
      <NavButton icon="Plus" title="만들기" />
      <NavButton icon="ChatLine" title="채팅" />
      <NavButton
        icon="MyPage"
        title="마이페이지"
        page="MyPage"
        onClick={() => push('MyPage', {})}
      />
    </div>
  )
}

function NavButton({
  icon,
  title,
  page,
  onClick,
}: {
  icon: string
  title: string
  page?: string
  onClick?: () => void
}) {
  const { activities } = useStack()
  const topActivity = activities.find((activity) => activity.isTop)

  return (
    <button
      className={classNames(styles.item, {
        [styles.active]: page === topActivity?.name,
      })}
      onClick={onClick}
    >
      <Icon icon={icon as IconType} size={24} />
      <span>{title}</span>
    </button>
  )
}
