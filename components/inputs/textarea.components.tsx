import React from 'react'
import { FieldError } from 'react-hook-form'
import { Error } from './error.components'
import { Label } from './label.components'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  formLabel: string
  error?: FieldError
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ formLabel, error, ...props }, ref) => {
  return (
    <>
      {formLabel && <Label htmlFor={props.name} labelText={formLabel} />}
      <textarea
        rows={4}
        className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 text-sm lg:text-base lg:p-3"
        placeholder="Décrivez votre session, par exemple séance de musculation haut du corps..."
        {...props}
        ref={ref}
      ></textarea>
      {error?.message && <Error message={error.message} />}
    </>
  )
})
Textarea.displayName = 'Textarea'
