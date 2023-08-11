import { ReactElement } from 'react'

interface ICard {
  title?: string
  content?: string | ReactElement
  image?: ReactElement
}

export const Card = (params: ICard) => {
  const { title, content: text, image } = params
  return (
    <div className="max-w-sm p-6 bg-white rounded-lg border-gray-300 shadow">
      {image}
      {title && <h2 className="mb-2 tracking-tight">{title}</h2>}
      {text && <p>{text}</p>}
    </div>
  )
}
