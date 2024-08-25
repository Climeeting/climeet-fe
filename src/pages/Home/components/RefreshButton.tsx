import Icon from '@/components/Icon/Icon'
import { PartyListQuery } from '@/services/party'
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'
import styles from './RefreshButton.module.scss'
import { useFilterParams } from '../hooks/useFilterParams'

export default function RefreshButton () {
  const params = useFilterParams()

  return (
    <button
      className={styles.Button}
      onClick={() => {
        PartyListQuery.refetch(params)
      }}
    >
      <VisuallyHidden>새로고침</VisuallyHidden>
      <Icon icon='Refresh' size='14' />
    </button>
  )
}
