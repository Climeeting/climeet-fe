import * as ProgressUi from '@radix-ui/react-progress'
import styles from './ProgressBar.module.scss'

type ProgressBarProps = {
  ratio: number
}

const ProgressBar = ({ ratio }: ProgressBarProps) => {
  return (
    <ProgressUi.Root className={styles.ProgressRoot} value={ratio}>
      <ProgressUi.Indicator
        className={styles.ProgressIndicator}
        style={{ transform: `translateX(-${100 - ratio}%)` }}
      />
    </ProgressUi.Root>
  )
}

export default ProgressBar
