import { format } from 'date-fns'
import i18next from 'i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import translation from 'zod-i18n-map/locales/fr/zod.json'
import {
  isFacebookProfileLink,
  isInstagramProfileLink,
  isTwitterProfileLink,
} from '../socialMedias/socialMedias.validators'
import { EBroLevel } from './profile.types'

i18next.init({
  lng: 'es',
  resources: {
    es: { zod: translation },
  },
})
z.setErrorMap(zodI18nMap)

export const profileValidator = z.object({
  town: z.string().min(1),
  sport: z.string().min(1),
  level: z.enum([EBroLevel.BEGINNER, EBroLevel.INTERMEDIATE, EBroLevel.ADVANCE]),
  description: z.string().min(1),
  availabilities: z
    .object({
      start: z.coerce
        .date()
        .min(new Date())
        .transform(date => format(date, "yyyy-MM-dd'T'HH:mm:ss")),
      end: z.coerce.date().transform(date => format(date, "yyyy-MM-dd'T'HH:mm")),
    })
    .refine(data => new Date(data.start) < new Date(data.end), {
      path: ['end'],
      message: 'La date doit être ultérieure ou égale à la date de départ',
    }),
  contact: z
    .string()
    .refine(data => isFacebookProfileLink(data) || isInstagramProfileLink(data) || isTwitterProfileLink(data), {
      message: "Le lien renseigné n'est ni un lien Facebook, ni Instagram, ni Twitter",
    }),
})

export type ValidatorSchemaType = z.infer<typeof profileValidator>
