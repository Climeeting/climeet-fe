import styles from './PartyIntroduceForm.module.scss'
import { PartySurveyFormData, UpdateFormData } from '../PartySurveyFormPage.tsx'
import { useRef, useState } from 'react'
import classNames from 'classnames'
import Icon from '@/components/Icon/Icon.tsx'
import { usePreviewImage } from '@/utils/usePreviewImage.tsx'
import { useFileActions } from '@/pages/PartySurveyForm/hooks/useFileContext.tsx'
import { useParams } from 'react-router-dom'

// @desc onChange 참고바랍니다.
let file: File | undefined = undefined

type PartyIntroduceFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function PartyIntroduceForm ({ onNext, formData, updateFormData }: PartyIntroduceFormProps) {
  const [partyName, setPartyName] = useState(formData.partyName)
  const [partyIntroduce, setPartyIntroduce] = useState(formData.partyDescription)
  const [src, setSrc] = useState<string>(formData.partyImageUrl)
  const ref = useRef<HTMLInputElement>(null)
  const updateProfileFile = useFileActions()
  usePreviewImage(ref, setSrc)
  const { id } = useParams<{ id: string }>()
  const isPartyEdit = id !== undefined

  const PARTY_NAME_MIN_LIMIT = 5
  const PARTY_NAME_MAX_LIMIT = 20
  const PARTY_INTRODUCE_MIN_LIMIT = 10
  const PARTY_INTRODUCE_MAX_LIMIT = 300

  const isPartyNameValid
    = partyName.length >= PARTY_NAME_MIN_LIMIT && partyName.length <= PARTY_NAME_MAX_LIMIT

  const isPartyIntroduceValid
    = partyIntroduce.length >= PARTY_INTRODUCE_MIN_LIMIT
    && partyIntroduce.length <= PARTY_INTRODUCE_MAX_LIMIT

  const isFormValid = isPartyNameValid && isPartyIntroduceValid

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>파티를 소개해주세요.</h2>
        {!isPartyEdit && (
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>사진 등록</h3>
            <div className={styles.content}>
              <input
                className={styles.Hidden}
                type='file'
                ref={ref}
                onChange={(e) => {
                // @desc updateProfileFile 사용시 file context 재렌더링 발생하여 이 페이지 모든 데이터 날아가기 때문에 아래의 방식으로 구현하였습니다.
                  if (e.target.files) {
                    file = (e.target.files[0])
                  }
                }}
              />
              <button
                className={styles.Button}
                onClick={() => {
                  if (ref.current) ref.current.click()
                }}
              >
                {
                  src
                    ? <img src={src} className={styles.PreviewImage} />
                    : (
                        <div className={styles.Default}>
                          <Icon icon='AddImage' size='40' />
                          <div>대표사진을 등록하시면<br />파티 참여율이 올라갑니다.</div>
                        </div>
                      )
                }
              </button>
            </div>
          </div>
        )}
        <div className={styles.question}>
          <h3 className={styles.questionTitle}>제목</h3>
          <div className={styles.content}>
            <input
              className={styles.input}
              placeholder='파티 제목을 입력해주세요.'
              value={partyName}
              onChange={(e) => {
                setPartyName(e.target.value)
              }}
              maxLength={20}
            />
            {partyName.length < PARTY_NAME_MIN_LIMIT
              ? (
                  <div className={styles.minMax}>
                    최소 {PARTY_NAME_MIN_LIMIT}자 / 최대 {PARTY_NAME_MAX_LIMIT}자
                  </div>
                )
              : (
                  <div className={styles.minMax}>
                    <strong>{partyName.length}자</strong> / 최대 {PARTY_NAME_MAX_LIMIT}자
                  </div>
                )}
          </div>
        </div>
        <div className={styles.question}>
          <h3 className={styles.questionTitle}>파티 소개 내용</h3>
          <div className={styles.content}>
            <textarea
              className={styles.textarea}
              placeholder='내용을 입력해주세요.'
              value={partyIntroduce}
              onChange={(e) => {
                setPartyIntroduce(e.target.value)
              }}
              maxLength={300}
            />
            {partyIntroduce === ''
              ? (
                  <div className={styles.minMax}>
                    최소 {PARTY_INTRODUCE_MIN_LIMIT}자 / 최대 {PARTY_INTRODUCE_MAX_LIMIT}자
                  </div>
                )
              : (
                  <div className={styles.minMax}>
                    <strong>{partyIntroduce.length}자</strong> / 최대 {PARTY_INTRODUCE_MAX_LIMIT}자
                  </div>
                )}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button
          className={classNames(styles.nextBtn, {
            [styles.disabled]: !isFormValid,
          })}
          onClick={() => {
            if (!isFormValid) {
              return
            }
            updateFormData('partyName', partyName)
            updateFormData('partyDescription', partyIntroduce)
            updateFormData('partyImageUrl', src)
            if (file) updateProfileFile(file)
            onNext()
          }}
        >
          다음
        </button>
      </div>
    </div>
  )
}
