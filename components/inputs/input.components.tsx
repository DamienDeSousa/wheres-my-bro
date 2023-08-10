import React from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formLabel: string
  error?: FieldError
}

export const Input = (params: InputProps) => {
  const { formLabel, error } = params

  return (
    <>
      {formLabel && (
        <label htmlFor={params.name} className="block mb-2 text-sm font-medium text-gray-900">
          {formLabel}
        </label>
      )}
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        {...params}
      />
      {error && <p className="text-xs italic text-red-500 mt-2">{error.message}</p>}
    </>
  )
}
