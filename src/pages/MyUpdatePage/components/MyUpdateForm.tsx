import styles from './MyUpdateForm.module.scss'
import { MyInfo, MyProfileBe2FeAdpter, skillOptions } from '@/services/user'
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'
import PreviewImage from './PreviewImage'
import RadioSex from './RadioSex'
import { MyProfile } from '@/pages/types/api'
import useFormValue from '@/utils/useFormValue'

type MyUpdateFormProps = {
  submited: boolean
  data?: MyProfile
}

export function MyUpdateForm({ submited, data }: MyUpdateFormProps) {
  const myData = data ? new MyProfileBe2FeAdpter(data).adapt() : null
  const [name, setName] = useFormValue<string>(myData?.nickname ?? '')
  const [sex, setSex] = useFormValue<MyInfo['sex'] | ''>(myData?.sex ?? '')
  const [skill, setSkill] = useFormValue<MyInfo['skill'] | ''>(myData?.skill ?? '')
  const [description, setDescription] = useFormValue<MyInfo['description'] | ''>('')
  const [profileImageUrl, setProfileImageUrl] = useFormValue<string>(myData?.profileImageUrl ?? '')

  // const disabled = !sex || !skill
  const warningName = submited && !name
  const warningSex = submited && !sex
  const warningSkill = submited && !skill

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
    </>
  )
}
