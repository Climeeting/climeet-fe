import { PropsWithChildren } from 'react'
import styles from './FilterButton.module.scss'
import Icon from '@/components/Icon/Icon'

type props = {
  count?: number
  active?: boolean
  onClick?: () => void
  onClickIcon?: () => void
} & React.RefAttributes<HTMLButtonElement>

export default function FilterButton({
  children,
  active,
  onClick,
  onClickIcon,
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
      <div onClick={onClickIcon}>
        {active ? <Icon icon="Delete" size="12" /> : <Icon icon="ArrowDown" size="12" />}
      </div>
    </button>
  )
}
