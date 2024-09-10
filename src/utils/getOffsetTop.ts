export default function getOffsetTop (element: HTMLElement | null) {
  if (!element) return 0
  // 요소의 위치 및 크기 정보를 가져오기
  const rect = element.getBoundingClientRect()

  // 절대 위치 계산
  const absoluteTop = rect.top + window.scrollY
  return absoluteTop
}
