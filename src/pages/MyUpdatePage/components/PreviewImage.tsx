import Avatar from '@/components/Avatar'
import { usePreviewImage } from '@/utils/usePreviewImage'
import { useRef } from 'react'
import styles from './PreviewImage.module.scss'
import Icon from '@/components/Icon/Icon'

type Props = {
  src?: string
  onChange: (src: string) => void
}

export default function PreviewImage({ src, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null)
  usePreviewImage(ref, onChange)

  return (
    <div className={styles.Container}>
      <input className={styles.Hidden} type="file" ref={ref} />
      <button
        className={styles.Button}
        onClick={() => {
          if (ref.current) ref.current.click()
        }}
      >
        {!src && (
          <div className={styles.Default}>
            <Icon icon="PersonFill" size="40" />
          </div>
        )}
        {src && <Avatar size="xl" src={src} alt="preview-img" />}
        <div className={styles.Icon}>
          <Icon size="16" icon="Camera" />
        </div>
      </button>
    </div>
  )
}
