import Icon from './Icon/Icon'
import styles from './Search.module.scss'

type Props = {
  onDelete?: () => void
} & React.InputHTMLAttributes<HTMLInputElement>

export function Search({ value, placeholder = '암장을 검색해 보세요.', onDelete, ...rest }: Props) {
  return (
    <div className={styles.container}>
      <input value={value} {...rest} placeholder={placeholder} type="text" />
      <div className={styles.icon}>
        <Icon icon="Search" />
      </div>
      {value && onDelete && (
        <button
          className={styles.delete}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
            e.currentTarget.blur()
          }}
        >
          <Icon icon="DeleteCircle" size="15" />
        </button>
      )}
    </div>
  )
}
