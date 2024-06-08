import { PropsWithChildren } from 'react'
import styles from './FilterButton.module.scss'
import Icon from '@/components/Icon/Icon'

type props = {
  count?: number
  active?: boolean
  onClick?: () => void
  remove?: () => void
} & React.RefAttributes<HTMLButtonElement>

export default function FilterButton({
  children,
  active,
  onClick,
  remove,
  ...rest
}: PropsWithChildren<props>) {
  return (
    <button
      onClick={onClick}
      className={styles.Button}
      data-state={active ? 'active' : ''}
      {...rest}
    >
      {children}

      {active && (
        <div
          className={styles.NoFlexShrink}
          onClick={(e) => {
            e.stopPropagation()
            remove?.()
          }}
        >
          <Icon icon="Delete" size="12" />
        </div>
      )}

      {!active && <Icon icon="ArrowDown" size="12" />}
    </button>
  )
}
