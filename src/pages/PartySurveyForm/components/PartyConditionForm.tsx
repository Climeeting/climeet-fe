import styles from './PartyConditionForm.module.scss'
import { useState } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'

type PartyConditionFormProps = {
  onNext: (partyCondition: any) => void
}

type Gender = '남녀 모두' | '남자만' | '여자만'
type Subject = '볼더링' | '리드' | '지구력' | '상관없음'

export function PartyConditionForm({ onNext }: PartyConditionFormProps) {
  const [currentGender, setCurrentGender] = useState<Gender>('남녀 모두')
  const [currentSubject, setCurrentSubject] = useState<Subject>('볼더링')
  const genderList: Gender[] = ['남녀 모두', '남자만', '여자만']
  const subjectList: Subject[] = ['볼더링', '리드', '지구력', '상관없음']

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>파티 조건을 선택해주세요.</h2>
        <div>
          <h3>파티 인원 (본인 포함)</h3>
          <input className={styles.input} placeholder={'0명'} />
        </div>
        <div>
          <h3>성별</h3>
          <div className={styles.trigger}>
            <div className={styles.triggerText}>{currentGender}</div>
          </div>
          <div className={styles.content}>
            <RadioButtonGroup list={genderList} onChange={(value) => setCurrentGender(value)} />
          </div>
        </div>
        <div>
          <h3>종목</h3>
          <div className={styles.trigger}>
            <div className={styles.triggerText}>{currentSubject}</div>
          </div>
          <div className={styles.content}>
            <RadioButtonGroup list={subjectList} onChange={(value) => setCurrentSubject(value)} />
          </div>
        </div>
        <div>
          <h3>실력</h3>
          <input className={styles.input} placeholder={'상관없음'} />
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.nextBtn} onClick={() => onNext({})}>
          다음
        </button>
      </div>
    </div>
  )
}

function RadioButtonGroup({ list, onChange }: { list: any[]; onChange: (value: any) => void }) {
  return (
    <form>
      <RadioGroup.Root
        className={styles.RadioGroupRoot}
        defaultValue={list[0]}
        onValueChange={onChange}
      >
        {list.map((el) => (
          <RadioGroup.Item className={styles.RadioGroupItem} value={el}>
            {el}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </form>
  )
}
