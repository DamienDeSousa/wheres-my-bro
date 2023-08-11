import { authOptions } from '@/lib/authOptions.lib'
import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import { getServerSession } from 'next-auth'
import { Card } from './cards/card.components'

export const AvailableTeammates = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  const matchedUserAccounts: IUserAccount[] = await UserAccount.find({
    $or: [
      {
        'availabilities.start': { $lte: session.user.availabilities!.start },
        'availabilities.end': { $gte: session.user.availabilities!.end },
      },
      {
        'availabilities.start': { $gte: session.user.availabilities!.start },
        'availabilities.end': { $lte: session.user.availabilities!.end },
      },
    ],
    town: session.user.town,
    email: { $ne: session.user.email },
    level: session.user.level,
    sport: session.user.sport,
  })

  return (
    <div className="flex flex-col gap-5">
      {matchedUserAccounts.map((bro: IUserAccount) => (
        <Card
          key={bro._id}
          title="trouver qqchose à mettre ici"
          content={
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <span className="block font-semibold text-[#52616f]">Séance :</span>
                <span className="block">{bro.description}</span>
              </div>
              <div className="flex flex-col">
                <span className="block font-semibold text-[#52616f]">Horaire :</span>
                <span className="block">
                  {`de ${new Date(bro.availabilities!.start).toLocaleString()} à ${new Date(
                    bro.availabilities!.end,
                  ).toLocaleString()}`}
                </span>
              </div>
              <div>{bro.contact}</div>
            </div>
          }
        />
      ))}
    </div>
  )
}
