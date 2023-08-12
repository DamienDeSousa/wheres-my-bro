'use client'

import { ValidatorSchemaType } from '@/services/profile/profile.validators'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DefaultValues, SubmitHandler } from 'react-hook-form'
import { ProfileForm } from './profile.forms.components'

export const EditProfile = () => {
  const router = useRouter()
  const { data: session, update } = useSession()

  if (!session?.user) {
    // il faut rediriger
    return null
  }

  const defaultValues: DefaultValues<ValidatorSchemaType> = {
    town: session.user.town!,
    sport: session.user.sport!,
    level: session.user.level!,
    description: session.user.description!,
    contact: session.user.contact!,
    availabilities: {
      start: new Date(session.user.availabilities!.start),
      end: new Date(session.user.availabilities!.end),
    },
  }

  const onSubmit: SubmitHandler<ValidatorSchemaType> = async data => {
    try {
      const { town, availabilities, sport, level, description, contact } = data
      const response = await fetch('/api/user-account/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ town, availabilities, sport, level, description, contact }),
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

  return <ProfileForm onSubmit={onSubmit} defaultValues={defaultValues} />
}
