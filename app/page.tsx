import { Presentation } from '@/components/Presentation'
import { FirstConnexion } from '@/components/FirstConnexion'
import { AvailableBros } from '@/components/AvailableBros'
import { SignOutButton } from '@/components/buttons/SignOutButton'
import { getLoggedUserAccount } from '@/services/modelHandlers/userAccount.modelhandler'

export default async function Page() {
  const userAccount = await getLoggedUserAccount()
  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          ...(!userAccount && { alignItems: 'center' }),
        }}
      >
        {userAccount ? (
          userAccount?.isFirstConnexion ? (
            <div>
              <SignOutButton />
              <FirstConnexion />
            </div>
          ) : (
            <div>
              <SignOutButton />
              {/* @ts-expect-error Server Component */}
              <AvailableBros />
            </div>
          )
        ) : (
          <Presentation />
        )}
      </div>
    </>
  )
}
