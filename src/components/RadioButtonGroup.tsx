import { RadioGroupProps } from '@radix-ui/react-radio-group'
import * as RadioGroup from '@radix-ui/react-radio-group'
import styles from './RadioButtonGroup.module.scss'

type RadioButtonGroupProps = {
  list: any[]
} & RadioGroupProps

export function RadioButtonGroup({ list, ...rest }: RadioButtonGroupProps) {
  return (
    <form>
      <RadioGroup.Root {...rest} className={styles.RadioGroupRoot}>
        {list.map((el) => (
          <RadioGroup.Item className={styles.RadioGroupItem} value={el}>
            {el}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </form>
  )
}
