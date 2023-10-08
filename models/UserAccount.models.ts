import mongoose, { Schema } from 'mongoose'

export interface IUserAccount {
  _id?: string
  isFirstConnexion: boolean
  email: string
  town?: string
  availability?: Date
  sport?: string
  formatedSport?: string
  description?: string
  contact?: string
  name: string
  image: string
}

const userAccountSchema: Schema = new Schema<IUserAccount>(
  {
    isFirstConnexion: { type: Boolean, default: true, required: true },
    email: { type: String, required: true },
    town: { type: String, required: false },
    availability: { type: Date, required: false },
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
