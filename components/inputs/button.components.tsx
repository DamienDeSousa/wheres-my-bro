import React from 'react'

export enum EButtonVariation {
  DEFAULT = 'default',
  LINK = 'link',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: EButtonVariation
}

const getClassFromVariant = (variant: EButtonVariation): string => {
  switch (variant) {
    case EButtonVariation.LINK:
      return 'font-medium text-[#5DA3E8] hover:text-[#1C6FC3] hover:underline'
    case EButtonVariation.DEFAULT:
    default:
      return 'text-white bg-[#5DA3E8] hover:bg-[#1C6FC3] rounded-lg px-10 py-3 focus:outline-none w-full md:w-72'
  }
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  const { variant = EButtonVariation.DEFAULT } = props

  return (
    <button className={getClassFromVariant(variant)} {...props} ref={ref}>
      {children}
    </button>
  )
})
Button.displayName = 'Button'
