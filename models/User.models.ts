import mongoose, { Schema } from 'mongoose'
import { User } from 'next-auth'

export type IBro = User

const userSchema: Schema = new Schema<User>(
  {
    name: { type: String, required: false },
    email: { type: String, required: false },
    image: { type: String, required: false },
  },
  { collection: 'users' },
)
export const Bro = mongoose.models.Bro || mongoose.model<IBro>('Bro', userSchema)
