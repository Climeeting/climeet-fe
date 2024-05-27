import logo from '/logo.png'
import styles from './TopBar.module.scss'
import Icon from '../Icon/Icon'

export default function TopBar() {
  return (
    <div className={styles.container}>
      <img width={70} height={18} src={logo} alt="logo" />
      <Icon icon="AlarmNew" />
    </div>
  )
}
