import i18next from 'i18next'
import { z } from 'zod'
import { ETeammateLevel } from './profile.types'
import translation from 'zod-i18n-map/locales/fr/zod.json'
import { zodI18nMap } from 'zod-i18n-map'

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
  level: z.enum([ETeammateLevel.BEGINNER, ETeammateLevel.INTERMEDIATE, ETeammateLevel.ADVANCE]),
  description: z.string().min(1),
  availabilities: z.object({
    start: z.coerce.date(),
    end: z.coerce.date(),
  }),
})
