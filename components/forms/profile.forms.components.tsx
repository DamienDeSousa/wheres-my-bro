import { formatDateForDatetimeInput } from '@/services/dates/date.formater'
import { ETeammateLevel } from '@/services/profile/profile.types'
import { profileValidator, ValidatorSchemaType } from '@/services/profile/profile.validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../inputs/button.components'
import { Input } from '../inputs/input.components'
import { Select } from '../inputs/select.components'
import { Textarea } from '../inputs/textarea.components'

interface IProfileForm {
  onSubmit: SubmitHandler<ValidatorSchemaType>
  defaultValues?: DefaultValues<ValidatorSchemaType>
}

export const ProfileForm = (params: IProfileForm) => {
  const { onSubmit, defaultValues } = params

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ValidatorSchemaType>({
    resolver: zodResolver(profileValidator),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
  })

  const startDate = watch('availabilities.start')

  const formatedStartDate = formatDateForDatetimeInput(new Date())
  const formatedEndDate = formatDateForDatetimeInput(new Date(startDate) || new Date())

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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              value={
                defaultValues?.availabilities?.start
                  ? formatDateForDatetimeInput(defaultValues?.availabilities?.start)
                  : undefined
              }
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              value={
                defaultValues?.availabilities?.end
                  ? formatDateForDatetimeInput(defaultValues?.availabilities?.end)
                  : undefined
              }
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
        <Select formLabel="Niveau" {...register('level')}>
          <option value={ETeammateLevel.BEGINNER}>Débutant</option>
          <option value={ETeammateLevel.INTERMEDIATE}>Intermédiaire</option>
          <option value={ETeammateLevel.ADVANCE}>Avancé</option>
        </Select>
      </div>
      <div>
        <Textarea
          error={errors.description}
          {...register('description')}
          formLabel="Description"
          placeholder="Décrivez votre session, par exemple séance de musculation haut du corps..."
        />
      </div>
      <div>
        <Input type="text" formLabel="Contact" placeholder="" {...register('contact')} error={errors.contact} />
      </div>
      <Button type="submit">Trouver mon équipier</Button>
    </form>
  )
}
