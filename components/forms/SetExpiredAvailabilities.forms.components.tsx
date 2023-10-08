/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { ValidatorSchemaType } from '@/services/profile/profile.validators'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { DefaultValues, SubmitHandler } from 'react-hook-form'
import { Alert } from '../alerts/alert.components'
import { ProfileForm } from './profile.forms.components'

export const SetExpiredAvailabilities = () => {
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
    description: session.user.description!,
    contact: session.user.contact!,
  }

  const onSubmit: SubmitHandler<ValidatorSchemaType> = async data => {
    try {
      const { town, availabilities, sport, description, contact } = data
      const response = await fetch('/api/user-account/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ town, availabilities, sport, description, contact }),
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
        <>
          <Alert
            importantText="Vos disponibilités sont périmées !"
            text="Veuillez en renseigner de nouvelles pour trouver un nouveau BRO"
          />
          <ProfileForm onSubmit={onSubmit} defaultValues={defaultValues} />
        </>
      )}
    </>
  )
}
