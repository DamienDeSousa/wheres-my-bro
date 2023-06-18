'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { TownInput } from './inputs/TownInput'

export const FirstConnexion: React.FC = () => {
  const [town, setTown] = useState<string>('')
  const [availabilities, setAvailabilities] = useState<string[]>([])
  const router = useRouter()
  const { data: session } = useSession()

  if (!session) {
    // il faut rediriger
    return null
  }

  const sendProfile = async () => {
    try {
      // créer cette route
      const response = await fetch('/api/user-account/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ town, availabilities, isFirstConnexion: false }),
      })
      if (response.status === 200) {
        // We are already on /, so we just reload page
        console.log('Redirect to /')
        router.push('/')
        // router.refresh()
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
