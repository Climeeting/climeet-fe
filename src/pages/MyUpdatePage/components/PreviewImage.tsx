import Avatar from '@/components/Avatar'
import { usePreviewImage } from '@/utils/usePreviewImage'
import { useRef } from 'react'
import styles from './PreviewImage.module.scss'
import Icon from '@/components/Icon/Icon'

export default function PreviewImage() {
  const ref = useRef<HTMLInputElement>(null)
  const imageSrc = usePreviewImage(ref)

  return (
    <div className={styles.Container}>
      <input className={styles.Hidden} type="file" ref={ref} />
      <button
        className={styles.Button}
        onClick={() => {
          if (ref.current) ref.current.click()
        }}
      >
        {!imageSrc && (
          <div className={styles.Default}>
            <Icon icon="PersonFill" size="40" />
          </div>
        )}
        {imageSrc && <Avatar size="xl" src={imageSrc} alt="preview-img" />}
        <div className={styles.Icon}>
          <Icon size="16" icon="Camera" />
        </div>
      </button>
    </div>
  )
}
