import { FieldError } from 'react-hook-form'

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  formLabel: string
  error?: FieldError
}

export const Textarea = (params: TextareaProps) => {
  const { formLabel, error } = params

  return (
    <>
      {formLabel && (
        <label htmlFor={params.name} className="block mb-2 text-sm font-medium text-gray-900">
          {formLabel}
        </label>
      )}
      <textarea
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
        placeholder="Décrivez votre session, par exemple séance de musculation haut du corps..."
        {...params}
      ></textarea>
      {error && <p className="text-xs italic text-red-500 mt-2"> {error.message}</p>}
    </>
  )
}
