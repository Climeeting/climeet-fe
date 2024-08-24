import Avatar from '@/components/Avatar'
import { usePreviewImage } from '@/utils/usePreviewImage'
import { useRef } from 'react'
import styles from './PreviewImage.module.scss'
import Icon from '@/components/Icon/Icon'

type Props = {
  src?: string
  onChange: (file: File) => void
  onChangeSrc: (src: string) => void
}

export default function PreviewImage ({ src, onChange, onChangeSrc }: Props) {
  const ref = useRef<HTMLInputElement>(null)
  usePreviewImage(ref, onChangeSrc)

  return (
    <div className={styles.Container}>
      <input
        className={styles.Hidden}
        type='file'
        ref={ref}
        onChange={(e) => {
          if (e.target.files) onChange(e.target.files[0])
        }}
      />
      <button
        className={styles.Button}
        onClick={() => {
          if (ref.current) ref.current.click()
        }}
      >
        {!src && (
          <div className={styles.Default}>
            <Icon icon='PersonFill' size='40' />
          </div>
        )}
        {src && <Avatar size='xl' src={src} alt='preview-img' />}
        <div className={styles.Icon}>
          <Icon size='16' icon='Camera' />
        </div>
      </button>
    </div>
  )
}
