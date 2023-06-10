import { authOptions } from '@/lib/authOptions.lib'
import { Bro, IBro } from '@/models/User.models'
import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import connectDB from '@/services/db'
import { getServerSession } from 'next-auth'

export const AvailableBros = async () => {
  const session = await getServerSession(authOptions)
  await connectDB()
  const userAccount: IUserAccount | null = await UserAccount.findOne({ email: session?.user?.email })

  if (!userAccount) {
    // ERROR
  }

  const matchedUserAccounts: IUserAccount[] = await UserAccount.find({
    town: userAccount?.town,
    availabilities: { $in: userAccount?.availabilities },
    email: { $ne: userAccount?.email },
  })

  const emails = matchedUserAccounts.map(matchedUserAccount => matchedUserAccount.email)
  const matchedBros: IBro[] = await Bro.find({
    email: { $in: emails },
  })

  return (
    <>
      {matchedBros.map((bro: IBro) => (
        <div>{bro.email}</div>
      ))}
    </>
  )
}
