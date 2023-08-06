import mongoose, { Schema } from 'mongoose'

export interface IAvailabilities {
  start: string
  end: string
}

export interface IUserAccount {
  _id?: string
  isFirstConnexion: boolean
  email: string
  town: string
  availabilities: IAvailabilities
  sport: string
  level: string
  description?: string
}

const availabilitiesSchema: Schema = new Schema<IAvailabilities>({
  start: { type: String, required: true },
  end: { type: String, required: true },
})

const userAccountSchema: Schema = new Schema<IUserAccount>(
  {
    isFirstConnexion: { type: Boolean, default: true, required: true },
    email: { type: String, required: true },
    town: { type: String, default: '' },
    availabilities: { type: availabilitiesSchema, required: true },
    sport: { type: String, required: true },
    level: { type: String, required: true },
    description: { type: String, required: false },
  },
  { collection: 'UserAccounts' },
)

export const UserAccount = mongoose.models.UserAccount || mongoose.model<IUserAccount>('UserAccount', userAccountSchema)
