import * as TabsUI from '@radix-ui/react-tabs'
import styles from './Tabs.module.scss'
import classNames from 'classnames'

function TabsRoot({ children }: { children: React.ReactNode }) {
  return (
    <TabsUI.Root className={styles.TabsRoot} defaultValue="파티">
      <TabsUI.List className={styles.TabsList}>
        <TabsUI.Trigger className={styles.TabsTrigger} value="파티">
          파티
        </TabsUI.Trigger>
        <TabsUI.Trigger className={styles.TabsTrigger} value="피드">
          피드
        </TabsUI.Trigger>
      </TabsUI.List>
      {children}
    </TabsUI.Root>
  )
}

function TabsContent(props: TabsUI.TabsContentProps) {
  return <TabsUI.Content className={classNames(styles.TabsContent, props.className)} {...props} />
}

const Tabs = Object.assign(TabsRoot, {
  Content: TabsContent,
})

export default Tabs
