import Error from '@/assets/error.png'
import styles from './NotFound.module.scss'
import Icon from './Icon/Icon'
import { useNavigate } from 'react-router-dom'

type Props = {
  message?: string
  hasRefresh?: boolean
  refresh?: () => void
}

export default function NotFound({ message, refresh, hasRefresh = true }: Props) {
  const navigate = useNavigate()

  return (
    <div className={styles.Container}>
      <img src={Error} />
      <span>{message || '페이지 로딩에 실패하였습니다.'}</span>
      {hasRefresh && (
        <button
          onClick={() => {
            if (refresh) refresh()
            else navigate(0)
          }}
        >
          <Icon className={styles.Icon} icon="Refresh" size={12} />
          새로고침
        </button>
      )}
    </div>
  )
}
