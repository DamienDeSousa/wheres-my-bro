import { IBro } from '@/models/User.models'
import { fetcher } from '@/services/fetcher'
import { useSession } from 'next-auth/react'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import useSWR from 'swr'

export const AvailableBros = () => {
  const { data: session } = useSession()
  const { data: bros = [], error } = useSWR('/api/availableBros/' + session?.user?.email, fetcher)

  return (
    <>
      {bros.map((bro: IBro) => (
        <div>{bro.email}</div>
      ))}
    </>
  )
}
