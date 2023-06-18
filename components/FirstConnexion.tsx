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
      const response = await fetch('/api/user-account/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ town, availabilities, isFirstConnexion: false }),
      })
      console.log(response)
      if (response.status !== 200) {
        return
      }
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <TownInput setTown={setTown} />
      <input
        type="datetime-local"
        onChange={event => setAvailabilities([...availabilities, event.target.value])}
        data-testid="availability"
      />
      <button onClick={sendProfile}>Trouver mon BRO</button>
    </>
  )
}
