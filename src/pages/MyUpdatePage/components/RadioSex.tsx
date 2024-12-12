import * as RadioGroup from '@radix-ui/react-radio-group'
import { MyInfo } from '@/services/user'
import styles from './RadioSex.module.scss'

type Props = {
  sex?: MyInfo['sex'] | ''
  setSex?: (sex: MyInfo['sex']) => void
}

export default function RadioSex ({ sex, setSex }: Props) {
  return (
    <RadioGroup.Root
      required
      value={sex}
      onValueChange={setSex}
      className={styles.RadioGroupRoot}
      aria-label='성별을 선택하세요'
    >
      <RadioGroup.Item disabled className={styles.RadioGroupItem} value='남자' id='MALE'>
        <RadioGroup.Indicator />
        <label className={styles.Label} htmlFor='r1'>
          남자
        </label>
      </RadioGroup.Item>

      <RadioGroup.Item disabled className={styles.RadioGroupItem} value='여자' id='FEMALE'>
        <RadioGroup.Indicator />
        <label className={styles.Label} htmlFor='r2'>
          여자
        </label>
      </RadioGroup.Item>
    </RadioGroup.Root>
  )
}
