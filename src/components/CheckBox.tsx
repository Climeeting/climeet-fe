import * as CheckboxUi from '@radix-ui/react-checkbox'
import Icon from './Icon/Icon'
import styles from './CheckBox.module.scss'

type CheckboxProps = {
  children: React.ReactNode
  id: string
  defaultChecked?: boolean
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export default function Checkbox({
  children,
  id,
  checked,
  onCheckedChange,
  defaultChecked = false,
}: CheckboxProps) {
  return (
    <div className={styles.Container}>
      <CheckboxUi.Root
        className={styles.CheckboxRoot}
        checked={checked}
        onCheckedChange={onCheckedChange}
        defaultChecked={defaultChecked}
        id={id}
      >
        <CheckboxUi.Indicator className={styles.CheckboxIndicator}>
          {checked ? (
            <Icon icon={'CheckboxChecked'} size={16} />
          ) : (
            <Icon icon={'CheckboxEmpty'} size={16} />
          )}
        </CheckboxUi.Indicator>
      </CheckboxUi.Root>
      <label className={styles.Label} htmlFor={id}>
        {children}
      </label>
    </div>
  )
}
