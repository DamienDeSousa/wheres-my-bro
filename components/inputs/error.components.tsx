interface IErrorParams {
  message: string
}

export const Error = (params: IErrorParams) => {
  return <p className="text-xs italic text-red-500 mt-2 lg:text-base">{params.message}</p>
}
