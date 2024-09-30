import BottomBar from '@/components/NavBar/BottomBar'
import TopBar from '@/components/NavBar/TopBar'
import styles from './LocationPage.module.scss'
import Error from '@/assets/error.png'

export default function LocationPage () {
  return (
    <div className={styles.Container}>
      <TopBar>
        <TopBar.Left back />
      </TopBar>
      <main className={styles.Main}>
        <img src={Error} />
        <div className={styles.Text}>
          <div>해당 서비스는</div>
          <div>아직 준비중에 있습니다 🙏🏻</div>
        </div>
      </main>
      <BottomBar />
    </div>
  )
}
