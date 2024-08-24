import { useEffect, useState } from 'react'

export function usePreviewImage (
  inputRef: React.RefObject<HTMLInputElement>,
  onChange?: (src: string) => void,
) {
  const [imageSrc, setImageSrc] = useState('')

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise((resolve) => {
      reader.onload = () => {
        onChange?.(reader.result as string)
        setImageSrc(reader.result as string)
        resolve(true)
      }
    })
  }

  useEffect(() => {
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target?.files?.[0]) encodeFileToBase64(target.files[0])
    }

    if (inputRef.current) {
      inputRef.current.addEventListener('change', handleFileChange)
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('change', handleFileChange)
      }
    }
  }, [inputRef.current])

  return imageSrc
}
