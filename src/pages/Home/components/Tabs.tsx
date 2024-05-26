import { useState } from 'react'
import styles from './Tabs.module.scss'
import classNames from 'classnames'

type TabsProps = {
  tabs: string[]
  onClick?: <T extends string>(tab: T) => void
}

export default function Tabs({ tabs, onClick }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            onClick?.(tab)
            setActiveTab(tab)
          }}
        >
          <h2 className={classNames(styles.title, { [styles.active]: activeTab === tab })}>
            {tab}
          </h2>
        </button>
      ))}
    </div>
  )
}
