import logo from '/logo.png'
import styles from './TopBar.module.scss'
import Icon from '../Icon/Icon'
import { useNavigate } from 'react-router-dom'
import { Slot, SlotProps } from '@radix-ui/react-slot'
import { Children, ReactNode, isValidElement, Suspense } from 'react'
import classNames from 'classnames'
import Notification from '@/pages/Home/components/Notification.tsx'
import { useIsLogin } from '@/services/user.ts'

/**
 * Left
 */
type LeftContentProps =
  | {
    back: true
    onClick?: () => void
    onBeforeBack?: () => void
  }
  | ({
    back?: false
    asChild?: boolean
    children: React.ReactNode
    className?: string
  } & SlotProps)

function LeftContent (props: LeftContentProps) {
  const navigate = useNavigate()

  if (props.back) {
    const { onClick, onBeforeBack } = props
    return (
      <button
        className={styles.Left}
        onClick={() => {
          if (onClick) return onClick()
          onBeforeBack?.()
          navigate(-1)
        }}
      >
        <Icon icon='ArrowLeft' />
      </button>
    )
  }

  const { asChild, ...rest } = props
  const Comp = asChild ? Slot : 'button'
  return (
    <div className={styles.Left}>
      <Comp {...rest} />
    </div>
  )
}

// @ts-expect-error - type 추론을 위해 사용
const LeftContentType = (<LeftContent />).type
function getLeftContent (children: ReactNode) {
  const childrenArray = Children.toArray(children)
  return childrenArray.filter(child => isValidElement(child) && child.type === LeftContentType)
}

/**
 * Right
 */
type RightContentProps =
  | {
    close: true
    onClick?: () => void
    className?: string
  }
  | ({
    close?: false
    asChild?: boolean
    children: React.ReactNode
    className?: string
  } & SlotProps)

function RightContent (props: RightContentProps) {
  if (props.close) {
    const { onClick, className } = props
    return (
      <button className={classNames(styles.Right, className)} onClick={onClick}>
        <Icon icon='Close' />
      </button>
    )
  }

  const { asChild, ...rest } = props
  const Comp = asChild ? Slot : 'button'
  return (
    <div className={styles.Right}>
      <Comp {...rest} />
    </div>
  )
}

// @ts-expect-error - type 추론을 위해 사용
const RightContentType = (<RightContent />).type
function getRightContent (children: ReactNode) {
  const childrenArray = Children.toArray(children)
  return childrenArray.filter(child => isValidElement(child) && child.type === RightContentType)
}

/**
 * Center
 */
type CenterContentProps =
  | {
    title: string
  }
  | ({
    title?: false
    asChild?: boolean
    children: React.ReactNode
    className?: string
  } & SlotProps)

function CenterContent (props: CenterContentProps) {
  if (typeof props.title === 'string') return <h1 className={styles.Center}>{props.title}</h1>

  const { asChild, ...rest } = props
  const Comp = asChild ? Slot : 'h1'
  return (
    <div className={styles.Center}>
      <Comp {...rest} />
    </div>
  )
}

// @ts-expect-error - type 추론을 위해 사용
const CenterContentType = (<CenterContent />).type
function getCenterContent (children: ReactNode) {
  const childrenArray = Children.toArray(children)
  return childrenArray.filter(child => isValidElement(child) && child.type === CenterContentType)
}

/**
 * Root
 */
type TopBarProps =
  | {
    type: 'main'
    bottomBorder?: boolean
  }
  | {
    type?: 'default'
    bottomBorder?: boolean
    children: ReactNode
  }
function TopBarRoot (props: TopBarProps) {
  const { data: isLogin } = useIsLogin()

  if (props.type === 'main')
    return (
      <div className={styles.Main}>
        <img width={70} height={18} src={logo} alt='logo' />
        {
          isLogin && (
            <Suspense fallback={<div></div>}>
              <Notification />
            </Suspense>
          )
        }
      </div>
    )

  const { children, bottomBorder } = props
  return (
    <div className={classNames(styles.Default, { [styles.bottomBorder]: bottomBorder })}>
      {getLeftContent(children)}
      {getCenterContent(children)}
      {getRightContent(children)}
    </div>
  )
}

const TopBar = Object.assign(TopBarRoot, {
  Left: LeftContent,
  Right: RightContent,
  Center: CenterContent,
})

export default TopBar
