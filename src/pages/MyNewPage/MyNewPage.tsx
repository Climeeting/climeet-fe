import Chip from '@/components/Chip'
import styles from './MyNewPage.module.scss'
import RadioSex from './components/RadioSex'
import { useState } from 'react'
import { AdditionalInfoAddapter, MyInfo, post_user_additionalInfo } from '@/services/user'
import { useLocation, useNavigate } from 'react-router-dom'
import SelectSkill from '../../components/SelectSkill'

export default function MyNewPage () {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirect = new URLSearchParams(search).get('redirect')

  const [sex, setSex] = useState<MyInfo['sex'] | ''>('')
  const [skillLevel, setSkillLevel] = useState<MyInfo['skillLevel'] | ''>('')
  const [submited, setSubmited] = useState(false)

  const disabled = !sex || !skillLevel
  const warningSex = submited && !sex
  const warningSkillLevel = submited && !skillLevel

  return (
    <div className={styles.Container}>
      <div className={styles.Main}>
        <div className={styles.Header}>
          <h1 className={styles.Title}>
            클라이밋에 오신것을
            <br />
            환영합니다🎉
          </h1>

          <span className={styles.Description}>
            간단한 자기소개로
            <br />
            나와 꼭 맞는 파트너를 구해보세요!
          </span>
        </div>

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
            {warningSkillLevel ? <p className={styles.Warning}>실력을 선택해주세요.</p> : null}
          </div>

          <SelectSkill skillLevel={skillLevel} setSkillLevel={setSkillLevel} />
        </fieldset>
      </div>

      <div className={styles.Bottom}>
        <p className={styles.Info}>해당 정보는 마이페이지에서 수정 가능합니다.</p>
        <Chip className={styles.Button} variable={disabled ? 'default' : 'primary'} asChild>
          <button
            disabled={disabled}
            onClick={async () => {
              if (disabled) {
                setSubmited(true)
                return
              }
              try {
                await post_user_additionalInfo(
                  new AdditionalInfoAddapter({
                    sex,
                    skillLevel,
                  }).adapt(),
                )
                if (redirect) navigate(redirect, { replace: true })
                else navigate('/', { replace: true })
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
