import * as ProgressUi from '@radix-ui/react-progress'
import styles from './ProgressBar.module.scss'
import classNames from 'classnames'

type ProgressBarProps = {
  ratio: number
  className?: string
}

const ProgressBar = ({ ratio, className }: ProgressBarProps) => {
  return (
    <ProgressUi.Root className={classNames(styles.ProgressRoot, className)} value={ratio}>
      <ProgressUi.Indicator
        className={styles.ProgressIndicator}
        style={{ transform: `translateX(-${100 - ratio}%)` }}
      />
    </ProgressUi.Root>
  )
}

export default ProgressBar
