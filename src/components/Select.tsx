import * as SelectUi from '@radix-ui/react-select'
import { SelectProps as SelectUiProps } from '@radix-ui/react-select'
import styles from './Select.module.scss'
import { forwardRef } from 'react'
import classNames from 'classnames'
import Icon from './Icon/Icon'

type SelectProps = {
  items: string[]
  placeholder: string
} & SelectUiProps

// Radix: https://www.radix-ui.com/primitives/docs/components/select
export default function Select({ items, placeholder, ...rest }: SelectProps) {
  return (
    <SelectUi.Root {...rest}>
      <SelectUi.Trigger className={styles.SelectTrigger}>
        <SelectUi.Value placeholder={placeholder} />
        <SelectUi.Icon className={styles.SelectIcon}>
          <Icon icon="ArrowDown" size="12" />
        </SelectUi.Icon>
      </SelectUi.Trigger>

      <SelectUi.Portal>
        <SelectUi.Content position="popper" className={styles.SelectContent}>
          <SelectUi.Viewport className={styles.SelectViewport}>
            <SelectUi.Group>
              <SelectUi.Label />
              {items.map((item) => (
                <SelectItem className={styles.SelectItem} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectUi.Group>
          </SelectUi.Viewport>
        </SelectUi.Content>
      </SelectUi.Portal>
    </SelectUi.Root>
  )
}

const SelectItem = forwardRef<any, any>(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectUi.Item className={classNames('SelectItem', className)} {...props} ref={forwardedRef}>
      <SelectUi.ItemText>{children}</SelectUi.ItemText>
      <SelectUi.ItemIndicator className="SelectItemIndicator">✔️</SelectUi.ItemIndicator>
    </SelectUi.Item>
  )
})
