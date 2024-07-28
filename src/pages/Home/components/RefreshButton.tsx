import Icon from '@/components/Icon/Icon'
import { PartyListQuery } from '@/services/party'
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'
import styles from './RefreshButton.module.scss'

export default function RefreshButton() {
  return (
    <button
      className={styles.Button}
      onClick={() => {
        PartyListQuery.refetch()
      }}
    >
      <VisuallyHidden>새로고침</VisuallyHidden>
      <Icon icon="Refresh" size="14" />
    </button>
  )
}
