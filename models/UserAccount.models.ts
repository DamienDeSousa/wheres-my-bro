import mongoose, { Schema } from 'mongoose'

export interface IUserAccount {
  _id?: string
  isFirstConnexion: boolean
  email: string
}

const userAccountSchema: Schema = new Schema<IUserAccount>(
  {
    isFirstConnexion: { type: Boolean, default: true, required: true },
    email: { type: String, required: true },
  },
  { collection: 'UserAccounts' },
)

export const UserAccount = mongoose.models.UserAccount || mongoose.model<IUserAccount>('UserAccount', userAccountSchema)
// export const UserAccount = mongoose.model<IUserAccount>('UserAccount', userAccountSchema)
