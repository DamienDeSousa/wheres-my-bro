interface ILabelParams {
  htmlFor?: string
  labelText: string
}

export const Label = (params: ILabelParams) => {
  return (
    <label htmlFor={params.htmlFor} className="block mb-2 text-gray-900 font-medium md:text-sm lg:text-base">
      {params.labelText}
    </label>
  )
}
