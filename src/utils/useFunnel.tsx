import { ReactElement, ReactNode, useState, FC } from 'react'

export interface StepProps<T extends string> {
  name: T
  children: ReactNode
}

export interface FunnelProps<T extends string> {
  children: Array<ReactElement<StepProps<T>>>
}

export const useFunnel = <T extends string>(defaultStep: T) => {
  const [step, setStep] = useState<T>(defaultStep)

  const Step: FC<StepProps<T>> = (props) => {
    return <>{props.children}</>
  }

  const Funnel: FC<FunnelProps<T>> = ({ children }) => {
    const targetStep = children.find(childStep => childStep.props.name === step)

    return <>{targetStep}</>
  }

  return { Funnel, Step, step, setStep }
}
