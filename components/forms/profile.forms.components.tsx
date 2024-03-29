import { profileValidator, ValidatorSchemaType } from '@/services/profile/profile.validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../inputs/button.components'
import { Input } from '../inputs/input.components'
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
  } = useForm<ValidatorSchemaType>({
    resolver: zodResolver(profileValidator),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
  })

  const formatedStartDate = new Date().toLocaleDateString('en-CA')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
      <div>
        <Input type="text" formLabel="Ville" {...register('town')} placeholder="Paris" error={errors.town} />
      </div>
      <div>
        <Input
          type="date"
          min={formatedStartDate}
          {...register('availability')}
          formLabel="Disponibilité"
          error={errors.availability}
        />
      </div>
      <div>
        <Input type="text" placeholder="Tennis" {...register('sport')} formLabel="Sport" error={errors.sport} />
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
