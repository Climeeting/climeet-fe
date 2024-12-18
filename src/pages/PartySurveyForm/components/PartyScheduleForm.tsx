import { PartySurveyFormData, Schedule, UpdateFormData } from '../PartySurveyFormPage.tsx'
import styles from './PartyScheduleForm.module.scss'
import * as Accordion from '@radix-ui/react-accordion'
import { AccordionContent, AccordionTrigger } from '../../../components/Accordion.tsx'
import { useState } from 'react'
import ScrollPicker from '@/components/ScrollPicker.tsx'
import {
  HOURS,
  MERIDIEM,
  MINUTES,
  useTimePicker,
} from '@/pages/PartySurveyForm/hooks/useTimePicker.ts'
import { DatePicker } from '@/components/DatePicker.tsx'

type PartyScheduleFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function PartyScheduleForm ({ onNext, formData, updateFormData }: PartyScheduleFormProps) {
  const { setTimePicker, timePicker, getNextTime } = useTimePicker(formData.partyTime)
  const [schedule, setSchedule] = useState<Schedule>({
    partyDate: formData.partyDate,
    partyTime: formData.partyTime,
  })

  const updateScheduleData = (key: keyof Schedule, value: Schedule[keyof Schedule]) => {
    setSchedule(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>
          마지막이에요!
          <br />
          파티 일정을 입력해주세요.
        </h2>
        <div>
          <Accordion.Root className='AccordionRoot' type='multiple' defaultValue={['item-1']}>
            <div className={styles.question}>
              <h3 className={styles.questionTitle}>파티 날짜</h3>
              <Accordion.Item className='AccordionItem' value='partyDate'>
                <AccordionTrigger>{schedule.partyDate.format('M월 DD일 (dd)')}</AccordionTrigger>
                <AccordionContent>
                  <DatePicker
                    selected={schedule.partyDate}
                    onClick={(date) => {
                      updateScheduleData('partyDate', date)
                    }}
                  />
                </AccordionContent>
              </Accordion.Item>
            </div>
            <div className={styles.question}>
              <h3 className={styles.questionTitle}>파티 시간</h3>
              <Accordion.Item className='AccordionItem' value='partyTime'>
                {/* 아래 값이 이상함 */}
                <AccordionTrigger>{timePicker.meridiem} {timePicker.hours}:{timePicker.minutes}</AccordionTrigger>
                <AccordionContent>
                  <div className={styles.ScrollPickerWrapper}>
                    <ScrollPicker
                      list={MERIDIEM}
                      defaultValue={{
                        value: timePicker.meridiem,
                        label: timePicker.meridiem,
                      }}
                      onSelectedChange={(option) => {
                        if (!option) return
                        const nextValue = {
                          ...timePicker,
                          meridiem: option.value as string,
                        }
                        setTimePicker(nextValue)
                        const nextPartyTime = getNextTime(
                          nextValue.meridiem,
                          nextValue.hours,
                          nextValue.minutes,
                        )
                        updateScheduleData('partyTime', nextPartyTime)
                      }}
                    />
                    <ScrollPicker
                      defaultValue={{
                        value: timePicker.hours,
                        label: timePicker.hours,
                      }}
                      list={HOURS}
                      onSelectedChange={(option) => {
                        if (!option) return
                        const nextValue = {
                          ...timePicker,
                          hours: option.value as string,
                        }
                        setTimePicker(nextValue)
                        const nextPartyTime = getNextTime(
                          nextValue.meridiem,
                          nextValue.hours,
                          nextValue.minutes,
                        )
                        updateScheduleData('partyTime', nextPartyTime)
                      }}
                    />
                    <ScrollPicker
                      defaultValue={{
                        value: timePicker.minutes,
                        label: timePicker.minutes,
                      }}
                      list={MINUTES}
                      onSelectedChange={(option) => {
                        if (!option) return
                        const nextValue = {
                          ...timePicker,
                          minutes: option.value as string,
                        }
                        setTimePicker(nextValue)
                        const nextPartyTime = getNextTime(
                          nextValue.meridiem,
                          nextValue.hours,
                          nextValue.minutes,
                        )
                        updateScheduleData('partyTime', nextPartyTime)
                      }}
                    />
                  </div>
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
        <button
          className={styles.nextBtn}
          onClick={() => {
            updateFormData('partyDate', schedule.partyDate)
            updateFormData('partyTime', schedule.partyTime)
            onNext()
          }}
        >
          다음
        </button>
      </div>
    </div>
  )
}
