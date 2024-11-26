import Icon from '@/components/Icon/Icon'
import styles from './RemoveFullButton.module.scss'
import { useFilterActions, useFilterContext } from '../hooks/useFilterContext'

export default function RemoveFullButton () {
  const { partyDisplayOption } = useFilterContext()
  const actions = useFilterActions()
  const checked = partyDisplayOption === '마감제거'

  return (
    <button
      className={styles.Button}
      data-checked={checked}
      onClick={() => {
        if (!checked) actions.partyDisplayOption.toggle('마감제거')
        else actions.partyDisplayOption.toggle('전체')
      }}
    >
      <Icon className={styles.Icon} icon='checkCircle' size='24' />
      마감 제거
    </button>
  )
}
