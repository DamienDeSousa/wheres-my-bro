import { Bro, IBro } from '@/models/User.models'
import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import { getLoggedUserAccount } from '@/services/modelHandlers/userAccount.modelhandler'

export const AvailableBros = async () => {
  const userAccount = await getLoggedUserAccount()

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
        <div key={bro.email}>{bro.email}</div>
      ))}
    </>
  )
}
