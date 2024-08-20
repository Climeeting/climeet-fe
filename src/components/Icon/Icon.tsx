import * as icons from './svgs'

export type IconType = keyof typeof icons
export const iconTypes: IconType[] = Object.keys(icons) as IconType[]

type IconProps = {
  icon: IconType
  color?: string
  stroke?: string
  className?: string
  size?: string | number
}

function Icon ({ icon, size = 24, className, stroke }: IconProps) {
  const SVGIcon = icons[icon]

  const props = {
    width: size,
    height: size,
    className,
    ...(stroke && { stroke }),
  }

  return <SVGIcon {...props} />
}

export default Icon
