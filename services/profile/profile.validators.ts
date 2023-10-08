import i18next from 'i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import translation from 'zod-i18n-map/locales/en/zod.json'
import {
  isFacebookProfileLink,
  isInstagramProfileLink,
  isTwitterProfileLink,
} from '../socialMedias/socialMedias.validators'

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
  description: z.string().min(1),
  availability: z.preprocess(val => new Date(String(val)).toISOString(), z.string().datetime()),
  contact: z
    .string()
    .refine(data => isFacebookProfileLink(data) || isInstagramProfileLink(data) || isTwitterProfileLink(data), {
      message: "Le lien renseigné n'est ni un lien Facebook, ni Instagram, ni Twitter",
    }),
})

export type ValidatorSchemaType = z.infer<typeof profileValidator>
