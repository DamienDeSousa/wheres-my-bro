import React from 'react'
import { FieldError } from 'react-hook-form'
import { Error } from './error.components'
import { Label } from './label.components'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  formLabel: string
  error?: FieldError
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ formLabel, error, children, ...props }, ref) => {
    return (
      <>
        {formLabel && <Label htmlFor={props.name} labelText={formLabel} />}
        <select
          {...props}
          ref={ref}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 md:text-sm lg:p-3 lg:text-base"
        >
          {children}
        </select>
        {error?.message && <Error message={error.message} />}
      </>
    )
  },
)
Select.displayName = 'Select'
