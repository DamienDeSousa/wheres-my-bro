import { authOptions } from '@/lib/authOptions.lib'
import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import { getServerSession } from 'next-auth'

export const AvailableBros = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  const matchedUserAccounts: IUserAccount[] = await UserAccount.find({
    town: session.user.town,
    'availabilities.start': { $lte: session.user.availabilities.start },
    'availabilities.end': { $gte: session.user.availabilities.end },
    email: { $ne: session.user.email },
    level: session.user.level,
    sport: session.user.sport,
  })

  return (
    <>
      {matchedUserAccounts.map((bro: IUserAccount) => (
        <div key={bro.email}>{bro.email}</div>
      ))}
    </>
  )
}
