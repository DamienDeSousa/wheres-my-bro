'use client'

import { ValidatorSchemaType } from '@/services/profile/profile.validators'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { ProfileForm } from './profile.forms.components'

export const FirstConnexion: React.FC = () => {
  const router = useRouter()
  const { data: session, update } = useSession()
  // quick win to avoid caching / page,
  // see https://stackoverflow.com/questions/76395110/next-js-v13-revalidate-not-triggering-after-router-push
  const [isPending, startTransition] = useTransition()

  if (!session) {
    // il faut rediriger
    return null
  }

  const onSubmit: SubmitHandler<ValidatorSchemaType> = async data => {
    try {
      const { town, availability, sport, description, contact } = data
      const response = await fetch('/api/user-account/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ town, availability, isFirstConnexion: false, sport, description, contact }),
      })

      if (response.status !== 200) {
        return
      }
      await update({
        ...session,
        user: {
          ...session?.user,
          town,
          availability,
          isFirstConnexion: false,
          sport,
          description,
          contact,
        },
      })
      startTransition(() => router.push('/'))
      startTransition(() => router.refresh())
    } catch (error) {
      console.error(error)
    }
  }

  return <>{isPending ? <div>A la recherche de BROS</div> : <ProfileForm onSubmit={onSubmit} />}</>
}
