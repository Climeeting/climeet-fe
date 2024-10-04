import { PartyDetailType } from '@/services/party'
import styles from './PartyParticipants.module.scss'
import { SkillDistribution } from '@/pages/types/api'

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
          style={{ width: `${Math.abs((count / currentParticipants) * 100)}%` }}
          className={styles.ProgressBar}
        />
      </div>
      <span className={styles.Count}>{count}명</span>
    </div>
  )
}
