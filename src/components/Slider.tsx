import * as SliderUi from '@radix-ui/react-slider'
import { SliderProps as SliderUiProps } from '@radix-ui/react-slider'
import styles from './Slider.module.scss'

export function Slider (props: SliderUiProps) {
  return (
    <SliderUi.Root {...props} className={styles.SliderRoot}>
      <SliderUi.Track className={styles.SliderTrack}>
        <SliderUi.Range className={styles.SliderRange} />
      </SliderUi.Track>
      {props.defaultValue?.map((_, index) => (
        <SliderUi.Thumb className={styles.SliderThumb} key={index} />
      ))}
    </SliderUi.Root>
  )
}
