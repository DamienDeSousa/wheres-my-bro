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
  },
  { collection: 'UserAccounts' },
)

export const UserAccount = mongoose.models.UserAccount || mongoose.model<IUserAccount>('UserAccount', userAccountSchema)
