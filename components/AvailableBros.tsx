import { authOptions } from '@/lib/authOptions.lib'
import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import { getServerSession } from 'next-auth'
import { Alert } from './alerts/alert.components'
import { SocialBroIcon } from './bros/icons/icons.social.bros'
import { Card } from './cards/card.components'

export const AvailableBros = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.availability) {
    return null
  }

  const matchedUserAccounts: IUserAccount[] = await UserAccount.find({
    availability: session.user.availability,
    town: session.user.town,
    email: { $ne: session.user.email },
    formatedSport: session.user.formatedSport,
  })

  if (matchedUserAccounts.length === 0) {
    return <Alert importantText="Aucun BRO n'est disponible avec ces paramètres..." />
  }

  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                  {`de ${new Date(bro.availability!).toLocaleString()} à ${new Date(
                    bro.availability!,
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
