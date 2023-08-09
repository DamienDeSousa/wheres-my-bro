import { authOptions } from '@/lib/authOptions.lib'
import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import { getServerSession } from 'next-auth'

export const AvailableTeammates = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  const matchedUserAccounts: IUserAccount[] = await UserAccount.find({
    $or: [
      {
        'availabilities.start': { $lte: session.user.availabilities.start },
        'availabilities.end': { $gte: session.user.availabilities.end },
      },
      {
        'availabilities.start': { $gte: session.user.availabilities.start },
        'availabilities.end': { $lte: session.user.availabilities.end },
      },
    ],
    town: session.user.town,
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
