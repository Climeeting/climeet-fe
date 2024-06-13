import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import Icon from './Icon/Icon.tsx'
import styles from './Accordion.module.scss'

export const AccordionTrigger = React.forwardRef<any, any>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className={styles.AccordionHeader}>
      <Accordion.Trigger
        className={classNames(styles.AccordionTrigger, className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <div className={styles.AccordionChevron}>
          <Icon icon={'ArrowDown'} size={'12'} />
        </div>
      </Accordion.Trigger>
    </Accordion.Header>
  )
)

export const AccordionContent = React.forwardRef<any, any>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={classNames(styles.AccordionContent, className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
)
