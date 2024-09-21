import Icon from '@/components/Icon/Icon'
import styles from './ScrollDownButton.module.scss'

export default function ScrollDownButton ({
  scrollBottom,
}: {
  scrollBottom: () => void
}) {
  return (
    <button
      onClick={scrollBottom}
      className={styles.ScrollDownButton}
    >
      <Icon icon='ArrowDown' size={16} />
    </button>
  )
}
