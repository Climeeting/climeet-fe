import { PartyDetailType } from '@/services/party'
import styles from './PartyParticipants.module.scss'
import { SkillDistribution, SkillLevel } from '@/pages/types/api'

export function PartyParticipants ({
  minimumSkillLevel,
  maximumSkillLevel,
  skillDistributions,
  currentParticipants,
}: PartyDetailType) {
  return (
    <>
      <h2 className={styles.Title}>참가자 실력 분포</h2>

      <div className={styles.Noti}>
        <span className={styles.NotiTitle}>파티 레벨</span>
        <span className={styles.Colon}>:</span>
        <span
          className={styles.NotiDescription}
        >{` V${minimumSkillLevel}부터 V${maximumSkillLevel}까지`}
        </span>
      </div>

      <div className={styles.GraphContainer}>
        {skillDistributions.map(skillDistribution => (
          <SkillGraph
            key={skillDistribution.skillLevel}
            skillDistribution={skillDistribution}
            currentParticipants={currentParticipants}
          />
        ))}
      </div>
    </>
  )
}

function SkillGraph ({
  skillDistribution,
  currentParticipants,
}: {
  skillDistribution: SkillDistribution
  currentParticipants: number
}) {
  const { skillLevel, count } = skillDistribution
  return (
    <div className={styles.Graph}>
      <span className={styles.SkillName}>{skillLevel}</span>
      <div className={styles.Progress}>
        <div
          style={{ width: `${Math.abs((count / currentParticipants) * 100)}%`, backgroundColor: SkillColor[skillLevel] }}
          className={styles.ProgressBar}
        />
      </div>
      <span className={styles.Count}>{count}명</span>
    </div>
  )
}

export const SkillColor: {
  [key in SkillLevel]: string
} = {
  'V0': '#F9CD56',
  'V1': '#FF862F',
  'V2': '#72C81D',
  'V3': '#4B7BF7',
  'V4': '#F0543F',
  'V5': '#7835F7',
  'V6': '#A1A1A1',
  'V7': '#9A5624',
  'V8+': '#222222',
  // V9: '#222222',
  // V10: '#222222',
} as const

PartyParticipants.Skeleton = function PartyParticipantsSkeleton () {
  return null
}
