import { useLayoutEffect, useRef } from 'react'

export const useVisualViewport = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // 가상 영역이 스크롤되는 문제를 해결 (viewport 이상으로 스크롤 안되도록 설정)
  const handleViewportScroll = (e: Event) => {
    const viewportScrollY = (e.target as HTMLElement).offsetTop
    if (!wrapperRef.current) {
      return
    }
    wrapperRef.current.style.transform = `translateY(${viewportScrollY}px)`
  }

  const setWrapperHeight = () => {
    if (!wrapperRef.current) {
      return
    }

    const nextHeight = visualViewport?.height ?? 0
    wrapperRef.current.style.height = `${nextHeight}px`
  }

  const setContainerHeight = () => {
    if (!containerRef.current) {
      return
    }

    const nextHeight = (visualViewport?.height ?? 0) - 64
    containerRef.current.style.height = `${nextHeight}px`
  }

  const setHeight = () => {
    setWrapperHeight()
    setContainerHeight()
  }

  useLayoutEffect(() => {
    setHeight()
    visualViewport?.addEventListener('resize', setHeight)
    visualViewport?.addEventListener('scroll', handleViewportScroll)

    return () => {
      visualViewport?.removeEventListener('resize', setHeight)
      visualViewport?.removeEventListener('scroll', handleViewportScroll)
    }
  }, [])

  return {
    wrapperRef,
    containerRef,
  }
}
