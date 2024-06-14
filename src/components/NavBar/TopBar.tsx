import logo from '/logo.png'
import styles from './TopBar.module.scss'
import Icon from '../Icon/Icon'
import { useNavigate } from 'react-router-dom'

type Props = {
  type?: 'default' | 'main'
  title?: string
  back?: boolean
  left?: () => React.ReactNode
  right?: () => React.ReactNode
}

export default function TopBar({ type = 'default', title, back = true, left, right }: Props) {
  const navigate = useNavigate()

  if (type === 'main')
    return (
      <div className={styles.Main}>
        <img width={70} height={18} src={logo} alt="logo" />
        <Icon icon="AlarmNew" />
      </div>
    )

  return (
    <div className={styles.Default}>
      {!left && back && (
        <button className={styles.Left} onClick={() => navigate(-1)}>
          <Icon icon="ArrowLeft" />
        </button>
      )}
      {left && <div className={styles.Left}>{left()}</div>}
      {title && <h1 className={styles.Title}>{title}</h1>}
      {right && <div className={styles.Right}>{right()}</div>}
    </div>
  )
}
