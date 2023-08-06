'use client'

import { IAvailabilities } from '@/models/UserAccount.models'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { TownInput } from './inputs/TownInput'

export const FirstConnexion: React.FC = () => {
  const [town, setTown] = useState<string | undefined>()
  const [sport, setSport] = useState<string | undefined>()
  const [level, setLevel] = useState<string | undefined>()
  const [description, setDescription] = useState<string | undefined>()
  const [availabilities, setAvailabilities] = useState<IAvailabilities | object>()
  const router = useRouter()
  const { data: session, update } = useSession()

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
        body: JSON.stringify({ town, availabilities, isFirstConnexion: false, sport, level, description }),
      })

      if (response.status !== 200) {
        return
      }
      await update({
        ...session,
        user: {
          ...session?.user,
          town,
          availabilities,
          isFirstConnexion: false,
          sport,
          level,
          description,
        },
      })
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
        onChange={event => setAvailabilities({ ...availabilities, start: event.target.value })}
        data-testid="availability-start"
      />
      <input
        type="datetime-local"
        onChange={event => setAvailabilities({ ...availabilities, end: event.target.value })}
        data-testid="availability-end"
      />
      <input placeholder="sport" onChange={event => setSport(event.target.value)} />
      <input placeholder="level" onChange={event => setLevel(event.target.value)} />
      <input placeholder="description" onChange={event => setDescription(event.target.value)} />
      <button onClick={sendProfile}>Trouver mon BRO</button>
    </>
  )
}
