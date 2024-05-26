import Icon from './Icon/Icon'
import styles from './Search.module.scss'

export function Search({
  placeholder = '암장을 검색해 보세요.',
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.container}>
      <input {...rest} placeholder={placeholder} type="text" />
      <div className={styles.icon}>
        <Icon icon="Search" />
      </div>
    </div>
  )
}
