import mongoose, { Schema } from 'mongoose'

export interface IUserAccount {
  _id?: string
  isFirstConnexion: boolean
  email: string
  town: string
  availabilities: Array<string>
}

const userAccountSchema: Schema = new Schema<IUserAccount>(
  {
    isFirstConnexion: { type: Boolean, default: true, required: true },
    email: { type: String, required: true },
    town: { type: String, default: '' },
    availabilities: { type: [String], required: true, default: [] },
  },
  { collection: 'UserAccounts' },
)

export const UserAccount = mongoose.models.UserAccount || mongoose.model<IUserAccount>('UserAccount', userAccountSchema)
