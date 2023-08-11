'use client'

import { ValidatorSchemaType } from '@/services/profile/profile.validators'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler } from 'react-hook-form'
import { ProfileForm } from './profile.forms.components'

export const FirstConnexion: React.FC = () => {
  const router = useRouter()
  const { data: session, update } = useSession()

  if (!session) {
    // il faut rediriger
    return null
  }

  const onSubmit: SubmitHandler<ValidatorSchemaType> = async data => {
    try {
      const { town, availabilities, sport, level, description, contact } = data
      const response = await fetch('/api/user-account/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ town, availabilities, isFirstConnexion: false, sport, level, description, contact }),
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
          contact,
        },
      })
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return <ProfileForm onSubmit={onSubmit} />
}
