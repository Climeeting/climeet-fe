import styles from './MyUpdatePage.module.scss'
import { useState } from 'react'
import TopBar from '@/components/NavBar/TopBar'
import BottomBar from '@/components/NavBar/BottomBar'
import { MyUpdateForm } from './components/MyUpdateForm'
import { useMyProfile } from '@/services/user'

export default function MyUpdatePage() {
  const [
    submited,
    // setSubmited
  ] = useState(false)

  const { data } = useMyProfile()

  return (
    <div className={styles.Container}>
      <TopBar>
        <TopBar.Left back />
        <TopBar.Center>프로필 수정</TopBar.Center>
        <TopBar.Right className={styles.SaveButton}>저장</TopBar.Right>
      </TopBar>

      <main>
        <MyUpdateForm data={data} submited={submited} />
      </main>

      <BottomBar />
    </div>
  )
}
