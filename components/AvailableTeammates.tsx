import { authOptions } from '@/lib/authOptions.lib'
import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import { getServerSession } from 'next-auth'
import { SocialBroIcon } from './bros/icons/icons.social.bros'
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
          title={bro.name}
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
              <div className="flex gap-2 items-center">
                <span className="block font-semibold text-[#52616f]">Contact : </span>
                <a href={bro.contact} target="_blank" className="block">
                  <SocialBroIcon link={bro.contact!} />
                </a>
              </div>
            </div>
          }
          image={bro.image}
          alt={bro.image}
        />
      ))}
    </div>
  )
}
