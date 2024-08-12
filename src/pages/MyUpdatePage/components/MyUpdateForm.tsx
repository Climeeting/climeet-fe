import styles from './MyUpdateForm.module.scss'
import { MyProfileInfo, skillLevelOptions } from '@/services/user'
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'
import PreviewImage from './PreviewImage'
import RadioSex from './RadioSex'
import { MyProfile } from '@/pages/types/api'
import { useMyInfoFormActions, useMyInfoFormContext } from '../hooks/useMyInfoForm'
import Select from '@/components/Select'
import { useFileActions } from '../hooks/useFileContext'
import { validations } from '../utils/validation'

type MyUpdateFormProps = {
  checkValid: boolean
  data?: MyProfile
}

export function MyUpdateForm({ checkValid }: MyUpdateFormProps) {
  const { nickname, sex, skillLevel, description, profileImageUrl } = useMyInfoFormContext()
  const { setNickName, setSex, setSkillLevel, setDescription, setProfileImageUrl } =
    useMyInfoFormActions()

  const updateProfileFile = useFileActions()

  const warningName = checkValid && validations.nickname(nickname)
  const warningSex = checkValid && validations.sex(sex)
  const warningSkillLevel = checkValid && validations.skillLevel(skillLevel)
  const warningDescription = checkValid && validations.description(description)

  return (
    <>
      <fieldset className={styles.FileldsetCenter}>
        <div className={styles.LabelWrapper}>
          <VisuallyHidden asChild>
            <h2>프로필 이미지</h2>
          </VisuallyHidden>
        </div>
        <PreviewImage
          src={profileImageUrl}
          onChange={updateProfileFile}
          onChangeSrc={setProfileImageUrl}
        />
      </fieldset>

      <fieldset className={styles.Fileldset}>
        <div className={styles.LabelWrapper}>
          <h2 className={styles.Label}>이름</h2>
          {warningName ? <p className={styles.Warning}>{warningName}</p> : null}
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
          {warningSex ? <p className={styles.Warning}>{warningSex}</p> : null}
        </div>
        <RadioSex sex={sex} setSex={setSex} />
      </fieldset>

      <fieldset className={styles.Fileldset}>
        <div className={styles.LabelWrapper}>
          <h2 className={styles.Label}>실력</h2>
          {warningSkillLevel ? <p className={styles.Warning}>{warningSkillLevel}</p> : null}
        </div>
        <Select
          value={skillLevel || '실력 없음'}
          onValueChange={(newSkillLevel) =>
            setSkillLevel(newSkillLevel as MyProfileInfo['skillLevel'])
          }
          name="skillLevel"
          placeholder={'실력 없음'}
        >
          <Select.Item disabled value={'실력 없음'}>
            실력 없음
          </Select.Item>
          {skillLevelOptions.map((skillLevel) => (
            <Select.Item key={skillLevel} value={skillLevel}>
              {skillLevel}
            </Select.Item>
          ))}
        </Select>
      </fieldset>

      <fieldset className={styles.Fileldset}>
        <div className={styles.LabelWrapper}>
          <h2 className={styles.Label}>자기소개</h2>
          {warningDescription ? <p className={styles.Warning}>{warningDescription}</p> : null}
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
