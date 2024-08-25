import { useEffect, useState, useRef } from 'react'

export function useOnScreen (ref: React.RefObject<HTMLElement>) {
  const [isOnScreen, setIsOnScreen] = useState(false)
  const observerRef = useRef<IntersectionObserver>()

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting))
  }, [])

  useEffect(() => {
    if (!ref.current) return
    if (observerRef.current) observerRef.current.observe(ref.current)

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [ref])

  return isOnScreen
}

export function useLoadMore (fetch: () => void) {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)

  useEffect(() => {
    if (isVisible) {
      fetch()
    }
  }, [isVisible])

  return ref
}
