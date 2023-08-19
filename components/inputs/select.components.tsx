import React from 'react'
import { FieldError } from 'react-hook-form'
import { Label } from './label.components'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  formLabel: string
  error?: FieldError
}

{
  /*export const Select = (params: SelectProps) => {
  const { children, formLabel, error } = params
  return (
    <>
      {formLabel && (
        <label htmlFor={params.name} className="block mb-2 text-sm font-medium text-gray-900">
          {formLabel}
        </label>
      )}
      <select
        {...params}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      >
        {children}
      </select>
      {error && <p className="text-xs italic text-red-500 mt-2"> {error.message}</p>}
    </>
  )
}*/
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
        {error && <p className="text-xs italic text-red-500 mt-2"> {error.message}</p>}
      </>
    )
  },
)
Select.displayName = 'Select'
