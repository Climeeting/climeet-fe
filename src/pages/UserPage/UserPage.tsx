import TopBar from '@/components/NavBar/TopBar'
import Profile from './components/Profile'
import styles from './UserPage.module.scss'
import useIsMine from './hook/useIsMine'
import BottomBar from '@/components/NavBar/BottomBar'

export default function UserPage() {
  const isMine = useIsMine()
  // const params = useParams<{ id: string }>()

  return (
    <div className={styles.Container}>
      <TopBar>
        <TopBar.Left back />
        <TopBar.Center>마이페이지</TopBar.Center>
        <TopBar.Right close />
      </TopBar>
      <section className={styles.ProfileSection}>
        <Profile isMine={isMine} />
      </section>
      <BottomBar />
    </div>
  )
}
