import * as SliderUi from '@radix-ui/react-slider'
import { SliderProps as SliderUiProps } from '@radix-ui/react-slider'
import styles from './SkillRange.module.scss'

export function SkillRange (props: SliderUiProps) {
  return (
    <div className={styles.Container}>
      <SliderUi.Root {...props} className={styles.SliderRoot}>
        <SliderUi.Track className={styles.SliderTrack}>
          <SliderUi.Range className={styles.SliderRange} />
        </SliderUi.Track>
        {props.defaultValue?.map((_, index) => (
          <SliderUi.Thumb className={styles.SliderThumb} key={index} />
        ))}
      </SliderUi.Root>
      <div className={styles.LabelContainer}>
        {skills.map((skill, index) => (
          <span key={index} className={styles.SliderLabel}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

const skills = Array.from({ length: 9 }, (_, i) => i === 8 ? `V${i}+` : `V${i}`)
