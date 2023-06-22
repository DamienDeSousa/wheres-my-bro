import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import { getLoggedUserAccount } from '@/services/modelHandlers/userAccount.modelhandler'

export const AvailableBros = async () => {
  const userAccount = await getLoggedUserAccount()

  if (!userAccount) {
    // ERROR
    return null
  }

  const matchedUserAccounts: IUserAccount[] = await UserAccount.find({
    town: userAccount?.town,
    availabilities: { $in: userAccount?.availabilities },
    email: { $ne: userAccount?.email },
  })

  return (
    <>
      {matchedUserAccounts.map((bro: IUserAccount) => (
        <div key={bro.email}>{bro.email}</div>
      ))}
    </>
  )
}
