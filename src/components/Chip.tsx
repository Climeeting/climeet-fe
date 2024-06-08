import { Slot, SlotProps } from '@radix-ui/react-slot'
import styles from './Chip.module.scss'
import classNames from 'classnames'

type Props = { asChild?: boolean; variable?: 'primary' | 'secondary' | 'default' } & SlotProps

export default function Chip({
  asChild = false,
  variable = 'default',
  className,
  ...props
}: Props) {
  const Comp = asChild ? Slot : 'div'
  return <Comp data-variable={variable} className={classNames(styles.Chip, className)} {...props} />
}
