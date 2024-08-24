import { useState } from 'react'

// https://velog.io/@woohm402/react-draft-state

type Return<T> = [
  T,
  (newValue: T) => void,
  {
    isChanged: boolean
    isTouched: boolean
    onReset: () => void
  },
]
export default function useFormValue<T> (initValue: T): Return<T> {
  const [draft, setDraft] = useState<T>()

  const value = draft ?? initValue

  const onChangeValue = (newValue: T) => setDraft(newValue)

  const isChanged = draft !== initValue // 변경했는지만 확인한다
  const isTouched = draft !== undefined // 지웠다 다시 쓴 것도 찾아준다
  const onReset = () => setDraft(undefined) // 초기값으로 돌려두기

  return [value, onChangeValue, { isChanged, isTouched, onReset }]
}
