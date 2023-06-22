import { authOptions } from '@/lib/authOptions.lib'
import { getServerSession } from 'next-auth'
import { connectDB } from '@/services/db'
import { IUserAccount, UserAccount } from '@/models/UserAccount.models'

export async function getLoggedUserAccount(): Promise<IUserAccount | null> {
  const session = await getServerSession(authOptions)
  await connectDB()
  const userAccount = session ? await UserAccount.findOne({ email: session?.user?.email }) : null
  return userAccount
}
