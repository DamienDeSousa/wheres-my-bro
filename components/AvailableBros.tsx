import { IBro } from '@/models/User.models'
import { fetcher } from '@/services/fetcher'
import { Box, SimpleGrid } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import useSWR from 'swr'

export const AvailableBros = () => {
  const { data: session } = useSession()
  const { data: bros = [], error } = useSWR('/api/availableBros/' + session?.user?.email, fetcher)

  return (
    <SimpleGrid minChildWidth="120px" spacing="40px">
      {bros.map((bro: IBro) => (
        <Box height="80px">{bro.email}</Box>
      ))}
    </SimpleGrid>
  )
}
