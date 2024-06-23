import * as ToggleGroup from '@radix-ui/react-toggle-group'
import styles from './ToggleSex.module.scss'
import { MyInfo } from '@/services/user'

type Props = {
  sex: MyInfo['sex'] | ''
  setSex: (sex: MyInfo['sex']) => void
}

export default function ToggleSex({ sex, setSex }: Props) {
  return (
    <ToggleGroup.Root
      value={sex}
      onValueChange={(sex) => {
        if (sex) setSex(sex as MyInfo['sex'])
      }}
      className={styles.ToggleGroup}
      type="single"
      aria-label="성별을 선택하세요"
    >
      <ToggleGroup.Item className={styles.ToggleGroupItem} value="남자">
        남자
      </ToggleGroup.Item>
      <ToggleGroup.Item className={styles.ToggleGroupItem} value="여자">
        여자
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
