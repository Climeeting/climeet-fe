import styles from './MyUpdateForm.module.scss'
import { MyProfileInfo, skillOptions } from '@/services/user'
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'
import PreviewImage from './PreviewImage'
import RadioSex from './RadioSex'
import { MyProfile } from '@/pages/types/api'
import { useMyInfoFormActions, useMyInfoFormContext } from '../hooks/useMyInfoForm'
import Select from '@/components/Select'

type MyUpdateFormProps = {
  checkValid: boolean
  data?: MyProfile
}

export function MyUpdateForm({ checkValid }: MyUpdateFormProps) {
  const { nickname, sex, skillLevel, description, profileImageUrl } = useMyInfoFormContext()
  const { setNickName, setSex, setSkillLevel, setDescription, setProfileImageUrl } =
    useMyInfoFormActions()

  const warningName = checkValid && !nickname
  const warningSex = checkValid && !sex
  const warningSkill = checkValid && !skillLevel
  const warningDescription = checkValid && !description

  return (
    <>
      <fieldset className={styles.FileldsetCenter}>
        <div className={styles.LabelWrapper}>
          <VisuallyHidden asChild>
            <h2>프로필 이미지</h2>
          </VisuallyHidden>
        </div>
        <PreviewImage src={profileImageUrl} onChange={setProfileImageUrl} />
      </fieldset>

      <fieldset className={styles.Fileldset}>
        <div className={styles.LabelWrapper}>
          <h2 className={styles.Label}>이름</h2>
          {warningName ? <p className={styles.Warning}>이름을 작성해주세요.</p> : null}
        </div>
        <input
          className={styles.Input}
          type="text"
          value={nickname}
          onChange={(e) => setNickName(e.target.value)}
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
        <Select
          value={skillLevel || '실력 없음'}
          onValueChange={(newSkill) => setSkillLevel(newSkill as MyProfileInfo['skillLevel'])}
          name="skill"
          placeholder={'실력 없음'}
        >
          <Select.Item disabled value={'실력 없음'}>
            실력 없음
          </Select.Item>
          {skillOptions.map((skill) => (
            <Select.Item key={skill} value={skill}>
              {skill}
            </Select.Item>
          ))}
        </Select>
      </fieldset>

      <fieldset className={styles.Fileldset}>
        <div className={styles.LabelWrapper}>
          <h2 className={styles.Label}>자기소개</h2>
          {warningDescription ? <p className={styles.Warning}>자기소개를 작성해주세요.</p> : null}
        </div>
        <textarea
          className={styles.Textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={150}
        />
      </fieldset>
    </>
  )
}
