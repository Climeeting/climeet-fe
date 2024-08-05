import Icon from '@/components/Icon/Icon'
import styles from './RemoveFullButton.module.scss'
import { useState } from 'react'
import { useFilterActions } from '../hooks/useFilterContext'

export default function RemoveFullButton() {
  const actions = useFilterActions()
  const [checked, setChecked] = useState(false)

  return (
    <button
      className={styles.Button}
      data-checked={checked}
      onClick={() => {
        actions.status.toggle('신청하기')
        setChecked(!checked)
      }}
    >
      <Icon className={styles.Icon} icon="checkCircle" size="24" />
      마감 제거
    </button>
  )
}
