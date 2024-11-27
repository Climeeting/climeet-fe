import { SkillLevel } from '@/pages/types/api'
import styles from './SelectSkill.module.scss'
import BottomSheet from '@/components/BottomSheet'
import { skillLevelOptions } from '@/services/user'
import Icon from '@/components/Icon/Icon'
import { useState } from 'react'

type Props = {
  skillLevel?: SkillLevel | ''
  setSkillLevel: (skill: SkillLevel) => void
}

const getLevel = (skillLevel?: SkillLevel) => {
  if (skillLevel === 'V8') return 'V8+'
  return skillLevel
}

export default function SelectSkill ({ skillLevel, setSkillLevel }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <BottomSheet open={open} onOpenChange={setOpen}>
      <BottomSheet.Trigger asChild>
        <button className={styles.Trigger} data-active={Boolean(skillLevel)}>
          {skillLevel === '' ? '실력을 선택해 주세요.' : `${getLevel(skillLevel)} 클라이머`}
          <Icon className={styles.Icon} icon='ArrowDown' size='12' />
        </button>
      </BottomSheet.Trigger>
      <BottomSheet.Content>
        <div className={styles.Content}>
          <div className={styles.Header}>
            <h2>실력</h2>
            <BottomSheet.Close className={styles.Close}>
              <Icon icon='Close' size='24' />
            </BottomSheet.Close>
          </div>
          <ul className={styles.SkillList}>
            {skillLevelOptions.map(skillLevelOption => (
              <li key={skillLevelOption}>
                <button
                  className={styles.SkillLevelOptionButton}
                  onClick={() => {
                    setSkillLevel(skillLevelOption)
                    setOpen(false)
                  }}
                  data-selected={skillLevelOption === skillLevel}
                >
                  {getLevel(skillLevelOption)} 클라이머
                  {skillLevelOption === skillLevel && (
                    <Icon className={styles.Icon} icon='Check' size='20' />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </BottomSheet.Content>
    </BottomSheet>
  )
}
