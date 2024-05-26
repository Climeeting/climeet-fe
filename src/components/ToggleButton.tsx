import * as ToggleUi from '@radix-ui/react-toggle'
import { ToggleProps as ToggleUiProps } from '@radix-ui/react-toggle'
import styles from './ToggleButton.module.scss'

type props = ToggleUiProps & React.RefAttributes<HTMLButtonElement>

// https://www.radix-ui.com/primitives/docs/components/toggle
export default function ToggleButton({ children, ...rest }: props) {
  return (
    <ToggleUi.Root {...rest} className={styles.Toggle} aria-label="Toggle italic">
      {children}
    </ToggleUi.Root>
  )
}
