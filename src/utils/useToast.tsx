import * as ToastUi from '@radix-ui/react-toast'
import styles from './Toast.module.scss'
import { createContext, useContext, useEffect, useState } from 'react'

const MILLI_SECONDS = 2000
const BUFFER_MILLI_SECONDS = 500

function Toast ({ children, miliseconds = MILLI_SECONDS }: {
  children: React.ReactNode
  miliseconds?: number
}) {
  const [open, setOpen] = useState(true)

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

type ToastContextType = {
  id: number
  message: string
  miliseconds: number
}

const ToastContext = createContext<ToastContextType[]>([])
const useToastContext = () => useContext(ToastContext)

type ToastActionsType = {
  add: (toast: Omit<ToastContextType, 'id' | 'miliseconds'>) => number
  remove: (id: number) => void
}

const ToastActions = createContext<ToastActionsType>({
  add: () => { return -1 },
  remove: () => {},
})
export const useToast = () => useContext(ToastActions)

export function ToastProvider ({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastContextType[]>([])

  const addToast = (toast: Partial<Omit<ToastContextType, 'message'>> & {
    message: ToastContextType['message']
  }) => {
    const id = Date.now()
    const newToast = {
      id,
      miliseconds: MILLI_SECONDS,
      ...toast,
    }
    setToasts([...toasts, newToast])

    return id
  }

  const removeToast = (id: number) => {
    setToasts(toasts.filter(toast => toast.id !== id))
  }

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        const newToast = toasts.slice(1)
        setToasts(newToast)
      }, toasts[0].miliseconds + BUFFER_MILLI_SECONDS)
      return () => clearTimeout(timer)
    }
  }, [toasts.length])

  return (
    <ToastContext.Provider value={toasts}>
      <ToastActions.Provider value={{
        add: addToast,
        remove: removeToast,
      }}
      >
        {children}
      </ToastActions.Provider>
    </ToastContext.Provider>
  )
}

export function ToastCore ({ children }: { children: React.ReactNode }) {
  const toasts = useToastContext()

  return (
    <>
      {children}
      {toasts.map(toast => (
        <Toast key={toast.id} miliseconds={toast.miliseconds}>
          {toast.message}
        </Toast>
      ))}
    </>
  )
}

export function Toasts ({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ToastCore>{children}</ToastCore>
    </ToastProvider>
  )
}

export default useToast
