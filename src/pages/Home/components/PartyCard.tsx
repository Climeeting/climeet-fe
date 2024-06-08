import Chip from '../../../components/Chip'
import Icon from '../../../components/Icon/Icon'
import styles from './PartyCard.module.scss'

type Props = {
  time: string
  title: string
  location: string
  constrains: string
  status: string
}

export default function PartyCard({ time, title, location, constrains, status }: Props) {
  return (
    <div className={styles.Container}>
      <section className={styles.Top}>
        <span className={styles.Time}>{time}</span>
        <h3>{title}</h3>
      </section>

      <div className={styles.Divider} />

      <section className={styles.Section}>
        <div>
          <div className={styles.Info}>
            <Icon icon={'LocationFill'} size="14" />
            {location}
          </div>
          <div className={styles.Info}>
            <Icon icon={'PersonFill'} size="14" />
            {constrains}
          </div>
        </div>
        <Chip className={styles.Chip} variable={'primary'}>
          {status}
        </Chip>
      </section>
    </div>
  )
}
