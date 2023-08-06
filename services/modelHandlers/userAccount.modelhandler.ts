import { authOptions } from '@/lib/authOptions.lib'
import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import { connectDB } from '@/services/db'
import { getServerSession } from 'next-auth'

export async function getLoggedUserAccount(): Promise<IUserAccount | null> {
  const session = await getServerSession(authOptions)
  await connectDB()
  const userAccount = session ? await UserAccount.findOne({ email: session?.user?.email }) : null
  return userAccount
}

export async function partialUserAccountUpdate(userEmail: string, params: object): Promise<IUserAccount> {
  await connectDB()
  const updatedUserAccount = await UserAccount.findOneAndUpdate(
    { email: userEmail },
    {
      ...params,
    },
    { new: true },
  )
  return updatedUserAccount
}
