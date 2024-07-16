import * as AvatarUi from '@radix-ui/react-avatar'
import styles from './Avatar.module.scss'
import classNames from 'classnames'

type Props = {
  src: string
  alt: string
  size?: 'small' | 'middle' | 'large' | 'xl'
  className?: string
}

export default function Avatar({ src, alt, size = 'middle', className }: Props) {
  return (
    <AvatarUi.Root className={classNames(styles.AvatarRoot, styles[size], className)}>
      <AvatarUi.Image className={styles.AvatarImage} src={src} alt={alt} />
      <AvatarUi.Fallback className={styles.AvatarFallback} delayMs={600}>
        {alt}
      </AvatarUi.Fallback>
    </AvatarUi.Root>
  )
}
