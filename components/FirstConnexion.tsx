import { Button, Input } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { TownInput } from './inputs/TownInput'

export const FirstConnexion: React.FC = (props: any) => {
  const [town, setTown] = useState<string>('')
  const [availabilities, setAvailabilities] = useState<string[]>([])
  const router = useRouter()
  const { data: session } = useSession()

  const sendProfile = async () => {
    try {
      const response = await fetch('/api/userAccount/' + session?.user?.email, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ town, availabilities }),
      })
      if (response.status === 200) {
        // Redirection vers la page de succès si la réponse est 201
        router.push('/')
      } else {
        console.error("Erreur lors de l'envoi des données à l'API")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <TownInput setTown={setTown} />
      <Input
        size="lg"
        type="datetime-local"
        onChange={event => setAvailabilities([...availabilities, event.target.value])}
      />
      <Button colorScheme="green" onClick={sendProfile}>
        Trouver mon BRO
      </Button>
    </>
  )
}
