import mongoose, { Schema } from 'mongoose'

export interface IAvailabilities {
  start: string
  end: string
}

export interface IUserAccount {
  _id?: string
  isFirstConnexion: boolean
  email: string
  town?: string
  availabilities?: IAvailabilities
  sport?: string
  formatedSport?: string
  description?: string
  contact?: string
  name: string
  image: string
}

const availabilitiesSchema: Schema = new Schema<IAvailabilities>({
  start: { type: String, required: true },
  end: { type: String, required: true },
})

const userAccountSchema: Schema = new Schema<IUserAccount>(
  {
    isFirstConnexion: { type: Boolean, default: true, required: true },
    email: { type: String, required: true },
    town: { type: String, required: false },
    availabilities: { type: availabilitiesSchema, required: false },
    sport: { type: String, required: false },
    formatedSport: { type: String, required: false },
    description: { type: String, required: false },
    contact: { type: String, required: false },
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { collection: 'UserAccounts' },
)

export const UserAccount = mongoose.models.UserAccount || mongoose.model<IUserAccount>('UserAccount', userAccountSchema)
