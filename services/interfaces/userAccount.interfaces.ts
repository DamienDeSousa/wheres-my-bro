import { IAvailabilities } from '@/models/UserAccount.models'
import { EBroLevel } from './../profile/profile.types'

export interface IUserAccountRequestParams {
  town: string
  availabilities: IAvailabilities
  isFirstConnexion: boolean
  sport: string
  level: EBroLevel
  description: string
  contact: string
}
