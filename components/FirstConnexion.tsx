'use client'

import { profileValidator } from '@/services/profile/profile.validators'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const FirstConnexion: React.FC = () => {
  const router = useRouter()
  const { data: session, update } = useSession()

  type ValidatorSchemaType = z.infer<typeof profileValidator>
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidatorSchemaType>({
    resolver: zodResolver(profileValidator),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  console.log(errors)

  if (!session) {
    // il faut rediriger
    return null
  }

  const onSubmit: SubmitHandler<ValidatorSchemaType> = async data => {
    try {
      const { town, availabilities, sport, level, description } = data
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="town" {...register('town')} />
      {errors.town && <p className="text-xs italic text-red-500 mt-2"> {errors.town?.message}</p>}

      <input type="datetime-local" {...register('availabilities.start')} />
      {errors.availabilities?.start && (
        <p className="text-xs italic text-red-500 mt-2"> {errors.availabilities?.start.message}</p>
      )}

      <input type="datetime-local" {...register('availabilities.end')} />
      {errors.availabilities?.end && (
        <p className="text-xs italic text-red-500 mt-2"> {errors.availabilities?.end.message}</p>
      )}

      <input placeholder="sport" {...register('sport')} />
      {errors.sport && <p className="text-xs italic text-red-500 mt-2"> {errors.sport.message}</p>}

      <input placeholder="level" {...register('level')} />
      {errors.level && <p className="text-xs italic text-red-500 mt-2"> {errors.level?.message}</p>}

      <input placeholder="description" {...register('description')} />
      {errors.description && <p className="text-xs italic text-red-500 mt-2"> {errors.description?.message}</p>}

      <button type="submit">Trouver mon BRO</button>
    </form>
  )
}
