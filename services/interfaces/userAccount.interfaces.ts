import { IAvailabilities } from '@/models/UserAccount.models'

export interface IUserAccountRequestParams {
  town?: string
  availabilities?: IAvailabilities
  isFirstConnexion?: boolean
}
