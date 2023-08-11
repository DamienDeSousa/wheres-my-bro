import Image from 'next/image'
import { ReactElement } from 'react'

interface ICard {
  title?: string
  content?: string | ReactElement
  image?: string
  alt?: string
}

export const Card = (params: ICard) => {
  const { title, content: text, image, alt } = params
  return (
    <div className="flex flex-col p-5 max-w-sm bg-white rounded-lg border-gray-300 shadow gap-6">
      {image && alt && (
        <div className="flex justify-center">
          <Image src={image} width={100} height={100} alt={alt} />
        </div>
      )}
      <div className="flex flex-col">
        {title && <h2 className="mb-2 tracking-tight">{title}</h2>}
        {text && <div>{text}</div>}
      </div>
    </div>
  )
}
