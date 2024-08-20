import * as ToastUi from '@radix-ui/react-toast'
import styles from './Toast.module.scss'
import { useEffect, useState } from 'react'

export const useToast = () => {
  const [open, setOpen] = useState(false)
  return [open, setOpen] as const
}

export default function Toast ({ open, setOpen, children, miliseconds = 2000 }: {
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
  miliseconds?: number
}) {
  useEffect(function removeToast () {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false)
      }, miliseconds)
      return () => clearTimeout(timer)
    }
  }, [open])

  return (
    <ToastUi.Provider swipeDirection='down'>
      <ToastUi.Root className={styles.ToastRoot} open={open} onOpenChange={setOpen}>
        <ToastUi.Title className={styles.ToastTitle}>{children}</ToastUi.Title>
      </ToastUi.Root>
      <ToastUi.Viewport className={styles.ToastViewport} />
    </ToastUi.Provider>
  )
}
