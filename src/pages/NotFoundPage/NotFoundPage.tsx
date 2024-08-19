import TopBar from '@/components/NavBar/TopBar'
import NotFound from '@/components/NotFound'
import styles from './NotFoundPage.module.scss'

export default function NotFoundPage() {
  return (
    <div className={styles.Container}>
      <TopBar>
        <TopBar.Left back />
      </TopBar>
      <NotFound message="잘못된 접근입니다." hasRefresh={false} />
    </div>
  )
}
