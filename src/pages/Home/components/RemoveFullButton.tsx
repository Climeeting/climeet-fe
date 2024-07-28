import Icon from '@/components/Icon/Icon'
import styles from './RemoveFullButton.module.scss'
import { useState } from 'react'

export default function RemoveFullButton() {
  const [checked, setChecked] = useState(false)
  return (
    <button
      className={styles.Button}
      data-checked={checked}
      onClick={() => {
        setChecked(!checked)
      }}
    >
      <Icon className={styles.Icon} icon="checkCircle" size="24" />
      마감 제거
    </button>
  )
}
