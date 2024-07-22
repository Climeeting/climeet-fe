import TopBar from '@/components/NavBar/TopBar'
import Profile from './components/Profile'
import styles from './UserPage.module.scss'
import useIsMine from './hook/useIsMine'
import BottomBar from '@/components/NavBar/BottomBar'
import Tabs from './components/Tabs'
import FeedList from './components/FeedList'
import PartyList from './components/PartyList'

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

      <Tabs>
        <Tabs.Content value="피드">
          <FeedList />
        </Tabs.Content>
        <Tabs.Content value="파티">
          <PartyList />
        </Tabs.Content>
      </Tabs>

      <BottomBar />
    </div>
  )
}
