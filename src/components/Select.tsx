import * as SelectUi from '@radix-ui/react-select'
import { SelectProps as SelectUiProps } from '@radix-ui/react-select'
import styles from './Select.module.scss'
import { forwardRef } from 'react'
import classNames from 'classnames'
import Icon from './Icon/Icon'

type SelectProps = {
  placeholder?: string
  children: React.ReactNode
} & SelectUiProps

// Radix: https://www.radix-ui.com/primitives/docs/components/select
function SelectRoot ({ placeholder, children, ...rest }: SelectProps) {
  return (
    <SelectUi.Root {...rest}>
      <SelectUi.Trigger className={styles.SelectTrigger}>
        <SelectUi.Value placeholder={placeholder} />
        <SelectUi.Icon className={styles.SelectIcon}>
          <Icon icon='ArrowDown' size='12' />
        </SelectUi.Icon>
      </SelectUi.Trigger>

      <SelectUi.Content position='popper' className={styles.SelectContent}>
        <SelectUi.Viewport className={styles.SelectViewport}>
          <SelectUi.Group>
            <SelectUi.Label />
            {children}
          </SelectUi.Group>
        </SelectUi.Viewport>
      </SelectUi.Content>
    </SelectUi.Root>
  )
}

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<any, any>(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectUi.Item
      className={classNames(styles.SelectItem, className)}
      {...props}
      ref={forwardedRef}
    >
      <SelectUi.ItemText>{children}</SelectUi.ItemText>
      <SelectUi.ItemIndicator className='SelectItemIndicator'>
        <Icon icon='Check' size='20' />
      </SelectUi.ItemIndicator>
    </SelectUi.Item>
  )
})

const Select = Object.assign(SelectRoot, {
  Item: SelectItem,
})

export default Select
