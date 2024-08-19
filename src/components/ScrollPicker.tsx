import { useRef, useEffect, useState } from 'react'
import styles from './ScrollPicker.module.scss'

const SCROLL_DEBOUNCE_TIME = 100
const ITEM_HEIGHT = 47

type Option = { value: string | number; label: string } | null

interface ScrollPickerProps {
  list: Option[]
  onSelectedChange?: (selectedIndex: Option) => void
  defaultValue?: Option
}

export const getScrollOption = (value: string | number) => {
  return {
    value,
    label: String(value),
  }
}

const ScrollPicker = ({ list, onSelectedChange, defaultValue }: ScrollPickerProps) => {
  const [selectedIndex, setSelectedIndex] = useState(1)
  const newList = [null, ...list, null]
  const ref = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const timerRef = useRef<number | null>(null)

  const moveScroll = (index: number) => {
    if (!ref.current) return
    const scrollPosition = index * ITEM_HEIGHT
    ref.current.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    })
  }

  const handleScroll = () => {
    if (ref.current) {
      clearTimeout(timerRef.current!)
      if (ref.current.scrollTop < ITEM_HEIGHT) {
        ref.current.scrollTop = ITEM_HEIGHT
      }
      timerRef.current = setTimeout(() => {
        const index = Math.floor((ref.current!.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT)
        const isEmptyItem = list[index] === null
        if (!isEmptyItem) {
          setSelectedIndex(index)
          moveScroll(index)
          onSelectedChange?.(newList[index])
        }
      }, SCROLL_DEBOUNCE_TIME)
    }
  }

  const findIndex = (target: Option) => {
    return newList.findIndex((item) => item?.value === target?.value)
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = selectedIndex * ITEM_HEIGHT
    }
  }, [selectedIndex])

  useEffect(() => {
    if (defaultValue === undefined) {
      return
    }
    const index = findIndex(defaultValue)
    setSelectedIndex(index)
  }, [defaultValue?.value])

  return (
    <ul ref={ref} onScroll={handleScroll} className={styles.List}>
      <div className={styles.ListCenter} />
      {newList.map((item, index) => (
        <li
          key={index}
          ref={(el) => (itemRefs.current[index] = el)}
          className={`${styles.ListItem} ${index === selectedIndex && styles.selected}`}
          onClick={() => {
            if (item === null) return
            setSelectedIndex(index)
            moveScroll(index)
            onSelectedChange && onSelectedChange(item)
          }}
        >
          {item?.label}
        </li>
      ))}
    </ul>
  )
}

export default ScrollPicker
