import { PartySurveyFormData, UpdateFormData } from '../PartySurveyFormPage.tsx'
import styles from './PartyScheduleForm.module.scss'
import * as Accordion from '@radix-ui/react-accordion'
import { AccordionContent, AccordionTrigger } from '../../../components/Accordion.tsx'

type PartyScheduleFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function PartyScheduleForm({ onNext, formData, updateFormData }: PartyScheduleFormProps) {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>
          마지막이에요!
          <br />
          파티 일정을 입력해주세요.
        </h2>
        <div>
          <Accordion.Root className="AccordionRoot" type="multiple" defaultValue={['item-1']}>
            <div className={styles.question}>
              <h3 className={styles.questionTitle}>파티 날짜</h3>
              <Accordion.Item className="AccordionItem" value={`partyDate`}>
                <AccordionTrigger>{formData.partyDate}</AccordionTrigger>
                <AccordionContent>
                  <input
                    type="date"
                    onChange={(e) => {
                      updateFormData('partyDate', e.target.value)
                    }}
                  />
                </AccordionContent>
              </Accordion.Item>
            </div>
            <div className={styles.question}>
              <h3 className={styles.questionTitle}>파티 시간</h3>
              <Accordion.Item className="AccordionItem" value={`partyTime`}>
                <AccordionTrigger>{formData.partyTime}</AccordionTrigger>
                <AccordionContent>
                  <input
                    type="time"
                    onChange={(e) => {
                      updateFormData('partyTime', e.target.value)
                    }}
                  />
                </AccordionContent>
              </Accordion.Item>
            </div>
          </Accordion.Root>
        </div>
        <div className={styles.notice}>
          <span>
            ※ 만남 3일 전부터 파티 삭제 및 수정은 불가합니다.
            <br />※ 유의 사항 문구를 입력해주세요.
          </span>
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.nextBtn} onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  )
}
