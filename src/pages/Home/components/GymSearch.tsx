import { Search } from '@/components/Search.tsx'
import styles from './GymSearch.module.scss'
import Icon from '@/components/Icon/Icon.tsx'
import * as Dialog from '@radix-ui/react-dialog'
import { useClimbingGymSearch } from '@/utils/useClimbingGymSearch.tsx'
import { Suspense, useState } from 'react'
import { useClimbingGymRecentSearches } from '@/services/gymSearch.ts'
import { ErrorBoundary } from 'react-error-boundary'

export default function GymSearch() {
  const [value, setValue] = useState('')
  const { gymList } = useClimbingGymSearch(value)

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Search placeholder="암장을 검색해 보세요." />
      </Dialog.Trigger>
      <Dialog.Overlay />
      <Dialog.Portal>
        <Dialog.Content className={styles.container}>
          <div className={styles.top}>
            <Dialog.Close asChild>
              <button className={styles.Left}>
                <Icon icon="ArrowLeft" size={24} />
              </button>
            </Dialog.Close>
            <Search
              placeholder="암장을 검색해 보세요."
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
              }}
            />
          </div>
          <div className={styles.recentSearchesContainer}>
            <h3 className={styles.title}>최근 검색어</h3>
            <ErrorBoundary fallback={<div>최근 검색어 불러오기 실패</div>}>
              <Suspense fallback={<div>로딩중...</div>}>
                <RecentSearches
                  onClick={(recentSearchText) => {
                    setValue(recentSearchText)
                  }}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className={styles.searchContainer}>
            <h3 className={styles.title}>암장 정보</h3>
            <div className={styles.searchList}>
              {gymList.map((el) => (
                <div
                  key={el.id}
                  className={styles.searchItem}
                  onClick={() => {
                    setValue(el.name)
                  }}
                >
                  <Icon icon={'Search'} size={16} />
                  <span className={styles.searchItemText}>{el.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type RecentSearchesProps = {
  onClick: (gymName: string) => void
}

function RecentSearches({ onClick }: RecentSearchesProps) {
  const { data } = useClimbingGymRecentSearches()

  if (data.content.length === 0) return <div>최근 검색어 없음</div>

  return (
    <div>
      <div className={styles.recentSearchList}>
        {data.content.map((el) => (
          <div
            onClick={() => onClick(el.gymName)}
            key={el.searchedAt}
            className={styles.recentSearchItem}
          >
            {el.gymName}
          </div>
        ))}
      </div>
    </div>
  )
}
