import Chip from '@/components/Chip'
import TopBar from '@/components/NavBar/TopBar'
import styles from './MyInfoFormPage.module.scss'
import ToggleSex from './components/ToggleSex'
import { useState } from 'react'
import {
  AdditionalInfoAddapter,
  MyInfo,
  post_user_additionalInfo,
  skillOptions,
} from '@/services/user'

const DEFAULT_SKILL = skillOptions[0]

export default function MyInfoFormPage() {
  const [sex, setSex] = useState<MyInfo['sex'] | ''>('')
  const [skill, setSkill] = useState<MyInfo['skill'] | ''>(DEFAULT_SKILL)
  const [description, setDescription] = useState<MyInfo['description']>('')

  const disabled = !sex || !skill || !description

  return (
    <div className={styles.Container}>
      <TopBar />

      <div className={styles.Main}>
        <h1>서비스 이용 시 필요한 정보입니다!</h1>

        <fieldset>
          <h2>성별</h2>
          <ToggleSex sex={sex} setSex={setSex} />
        </fieldset>

        <fieldset>
          <h2>실력</h2>
          <select
            value={skill}
            defaultValue={DEFAULT_SKILL}
            onChange={(e) => setSkill(e.target.value as MyInfo['skill'])}
            name="skill"
          >
            {skillOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <h2>소개</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="소개를 입력해주세요"
          />
        </fieldset>
      </div>

      <div className={styles.Bottom}>
        <Chip className={styles.Button} variable={disabled ? 'default' : 'primary'} asChild>
          <button
            disabled={disabled}
            onClick={async () => {
              if (disabled) return
              try {
                await post_user_additionalInfo(
                  new AdditionalInfoAddapter({
                    description,
                    sex,
                    skill,
                  }).adapt()
                )
                console.log('저장 성공')
              } catch (e) {
                console.error(e)
              }
            }}
          >
            저장하기
          </button>
        </Chip>
      </div>
    </div>
  )
}
