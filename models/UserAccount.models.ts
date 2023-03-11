import mongoose, { Schema } from 'mongoose'

export interface IUserAccount {
  _id?: string
  isFirstConnexion: boolean
  userId: string
}

const userAccountSchema: Schema = new Schema<IUserAccount>(
  {
    isFirstConnexion: { type: Boolean, default: true, required: true },
    userId: { type: String, required: true },
  },
  { collection: 'UserAccount' },
)

export const UserAccount = mongoose.model('UserAccount', userAccountSchema)
