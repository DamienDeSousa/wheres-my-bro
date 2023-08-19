import React from 'react'
import { FieldError } from 'react-hook-form'
import { Label } from './label.components'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formLabel?: string
  error?: FieldError
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ formLabel, error, ...props }, ref) => {
  return (
    <>
      {formLabel && <Label htmlFor={props.name} labelText={formLabel} />}
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 text-sm lg:p-3 lg:text-base"
        {...props}
        ref={ref}
      />
      {error && <p className="text-xs italic text-red-500 mt-2 lg:text-base">{error.message}</p>}
    </>
  )
})
Input.displayName = 'Input'
