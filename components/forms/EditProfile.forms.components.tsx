'use client'

import { ValidatorSchemaType } from '@/services/profile/profile.validators'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { DefaultValues, SubmitHandler } from 'react-hook-form'
import { ProfileForm } from './profile.forms.components'

export const EditProfile = () => {
  const router = useRouter()
  const { data: session, update } = useSession()
  // quick win to avoid caching / page,
  // see https://stackoverflow.com/questions/76395110/next-js-v13-revalidate-not-triggering-after-router-push
  const [isPending, startTransition] = useTransition()

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
      ...session.user.availabilities,
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
      startTransition(() => router.push('/'))
      startTransition(() => router.refresh())
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {isPending ? (
        <div>A la recherche de BROS</div>
      ) : (
        <ProfileForm onSubmit={onSubmit} defaultValues={defaultValues} />
      )}
    </>
  )
}
