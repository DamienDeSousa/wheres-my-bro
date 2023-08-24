import { formatDateForDatetimeInput } from '@/services/dates/date.formater'
import { EBroLevel } from '@/services/profile/profile.types'
import { profileValidator, ValidatorSchemaType } from '@/services/profile/profile.validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../inputs/button.components'
import { Input } from '../inputs/input.components'
import { Label } from '../inputs/label.components'
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
      <div>
        <Input type="text" formLabel="Ville" {...register('town')} placeholder="Paris" error={errors.town} />
      </div>
      <div>
        <Label labelText="Créneau de disponibilité" />
        <div className="flex gap-1">
          <div className="flex flex-col w-1/2">
            <Input
              type="datetime-local"
              min={formatedStartDate}
              {...register('availabilities.start')}
              error={errors.availabilities?.start}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <Input
              type="datetime-local"
              min={formatedEndDate}
              {...register('availabilities.end')}
              error={errors.availabilities?.end}
            />
          </div>
        </div>
      </div>
      <div>
        <Input type="text" placeholder="Tennis" {...register('sport')} formLabel="Sport" error={errors.sport} />
      </div>
      <div>
        <Select formLabel="Niveau" {...register('level')}>
          <option value={EBroLevel.BEGINNER}>Débutant</option>
          <option value={EBroLevel.INTERMEDIATE}>Intermédiaire</option>
          <option value={EBroLevel.ADVANCE}>Avancé</option>
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
        <Input
          type="text"
          formLabel="Contact (lien de votre profil Facebook, Instagram ou Twitter)"
          placeholder=""
          {...register('contact')}
          error={errors.contact}
        />
      </div>
      <div className="w-full flex justify-center">
        <Button type="submit">Trouver mon BRO</Button>
      </div>
    </form>
  )
}
