import styles from './MyUpdatePage.module.scss'
import RadioSex from './components/RadioSex'
import { useState } from 'react'
import {
  // AdditionalInfoAddapter,
  MyInfo,
  // post_user_additionalInfo,
  skillOptions,
} from '@/services/user'
import TopBar from '@/components/NavBar/TopBar'
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'
import BottomBar from '@/components/NavBar/BottomBar'

export default function MyUpdatePage() {
  const [name, setName] = useState<string>('')
  const [sex, setSex] = useState<MyInfo['sex'] | ''>('')
  const [skill, setSkill] = useState<MyInfo['skill'] | ''>('')
  const [description, setDescription] = useState<MyInfo['description'] | ''>('')
  const [
    submited,
    // setSubmited
  ] = useState(false)

  // const disabled = !sex || !skill
  const warningName = submited && !name
  const warningSex = submited && !sex
  const warningSkill = submited && !skill

  return (
    <div className={styles.Container}>
      <TopBar right={SaveButton} />

      <fieldset className={styles.Fileldset}>
        <div className={styles.LabelWrapper}>
          <VisuallyHidden asChild>
            <h2>프로필 이미지</h2>
          </VisuallyHidden>
        </div>
        <input type="file" />
      </fieldset>

      <fieldset className={styles.Fileldset}>
        <div className={styles.LabelWrapper}>
          <h2 className={styles.Label}>이름</h2>
          {warningName ? <p className={styles.Warning}>이름을 작성해주세요.</p> : null}
        </div>
        <input
          className={styles.Input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </fieldset>

      <fieldset className={styles.Fileldset}>
        <div className={styles.LabelWrapper}>
          <h2 className={styles.Label}>성별</h2>
          {warningSex ? <p className={styles.Warning}>성별을 선택해주세요.</p> : null}
        </div>
        <RadioSex sex={sex} setSex={setSex} />
      </fieldset>

      <fieldset className={styles.Fileldset}>
        <div className={styles.LabelWrapper}>
          <h2 className={styles.Label}>실력</h2>
          {warningSkill ? <p className={styles.Warning}>실력을 선택해주세요.</p> : null}
        </div>
        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value as MyInfo['skill'])}
          name="skill"
        >
          <option disabled selected value={''}>
            실력 없음
          </option>
          {skillOptions.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className={styles.Fileldset}>
        <div className={styles.LabelWrapper}>
          <h2 className={styles.Label}>자기소개</h2>
          {warningName ? <p className={styles.Warning}>자기소개를 작성해주세요.</p> : null}
        </div>
        <textarea
          className={styles.Textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </fieldset>

      <BottomBar />
    </div>
  )
}

function SaveButton() {
  return <button className={styles.SaveButton}>저장</button>
}
