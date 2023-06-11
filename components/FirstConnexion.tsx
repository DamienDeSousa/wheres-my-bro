'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { TownInput } from './inputs/TownInput'

export const FirstConnexion: React.FC = (props: any) => {
  const [town, setTown] = useState<string>('')
  const [availabilities, setAvailabilities] = useState<string[]>([])
  const router = useRouter()
  const { data: session } = useSession()

  if (!session) {
    // il faut rediriger
  }

  const sendProfile = async () => {
    try {
      // créer cette route
      const response = await fetch('/api/userAccount/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ town, availabilities }),
      })
      if (response.status === 200) {
        // We are already on /, so we just reload page
        console.log('Redirect to /')
        router.reload()
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
      <input type="datetime-local" onChange={event => setAvailabilities([...availabilities, event.target.value])} />
      <button onClick={sendProfile}>Trouver mon BRO</button>
    </>
  )
}
