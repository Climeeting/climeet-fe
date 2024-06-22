import * as ProgressUi from '@radix-ui/react-progress'
import styles from './ProgressBar.module.scss'

type ProgressBarProps = {
  value: number
}

const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <ProgressUi.Root className={styles.ProgressRoot} value={value}>
      <ProgressUi.Indicator
        className={styles.ProgressIndicator}
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressUi.Root>
  )
}

export default ProgressBar
