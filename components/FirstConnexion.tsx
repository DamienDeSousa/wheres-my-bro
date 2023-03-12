import { Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { TownInput } from './inputs/TownInput'

export const FirstConnexion: React.FC = (props: any) => {
  const [town, setTown] = useState<string>('')
  const [availabilities, setAvailabilities] = useState<string[]>([])

  const sendProfile = async () => {
    try {
      const response = await fetch('votre_url_api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ town, availabilities }),
      })
      if (response.status === 201) {
        // Redirection vers la page de succès si la réponse est 201
        window.location.href = '/success'
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
