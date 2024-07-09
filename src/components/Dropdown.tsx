import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DropdownMenuItemProps, DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import styles from './Dropdown.module.scss'
import classNames from 'classnames'

function DropdownContent({ className, ...rest }: DropdownMenuContentProps) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={classNames(styles.DropdownContent, className)}
        sideOffset={130}
        side="left"
        align="end"
        {...rest}
      />
    </DropdownMenu.Portal>
  )
}

function DropdownItem({ className, ...rest }: DropdownMenuItemProps) {
  return <DropdownMenu.Item className={classNames(styles.DropdownItem, className)} {...rest} />
}

const Dropdown = Object.assign(DropdownMenu.Root, {
  Trigger: DropdownMenu.Trigger,
  Content: DropdownContent,
  Item: DropdownItem,
})

export default Dropdown
