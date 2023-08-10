'use client'

import { formatDateForDatetimeInput } from '@/services/dates/date.formater'
import { profileValidator } from '@/services/profile/profile.validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from './inputs/input.components'
import { Textarea } from './inputs/textarea.components'

export const FirstConnexion: React.FC = () => {
  const router = useRouter()
  const { data: session, update } = useSession()

  type ValidatorSchemaType = z.infer<typeof profileValidator>

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ValidatorSchemaType>({
    resolver: zodResolver(profileValidator),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const startDate = watch('availabilities.start')

  const formatedStartDate = formatDateForDatetimeInput(new Date())
  const formatedEndDate = formatDateForDatetimeInput(new Date(startDate) || new Date())

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <Input type="text" formLabel="Ville" {...register('town')} placeholder="Paris" error={errors.town} />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Créneau de disponibilité</label>
        <div className="flex">
          <div className="flex flex-col w-1/2">
            <input
              type="datetime-local"
              min={formatedStartDate}
              {...register('availabilities.start')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.availabilities?.start && (
              <p className="text-xs italic text-red-500 mt-2"> {errors.availabilities?.start.message}</p>
            )}
          </div>
          <div className="flex flex-col w-1/2">
            <input
              type="datetime-local"
              min={formatedEndDate}
              {...register('availabilities.end')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.availabilities?.end && (
              <p className="text-xs italic text-red-500 mt-2"> {errors.availabilities?.end.message}</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <Input type="text" placeholder="Tennis" {...register('sport')} formLabel="Sport" error={errors.sport} />
      </div>
      <div>
        <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Niveau
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="intermediaire"
          {...register('level')}
        />
        {errors.level && <p className="text-xs italic text-red-500 mt-2"> {errors.level?.message}</p>}
      </div>
      <div>
        <Textarea
          error={errors.description}
          {...register('description')}
          formLabel="Description"
          placeholder="Décrivez votre session, par exemple séance de musculation haut du corps..."
        />
      </div>

      <button
        type="submit"
        className="text-white bg-[#5DA3E8] hover:bg-[#1C6FC3] rounded-lg px-10 py-3 focus:outline-none w-full"
      >
        Trouver mon équipier
      </button>
    </form>
  )
}
