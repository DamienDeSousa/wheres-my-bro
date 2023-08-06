import { AvailableBros } from '@/components/AvailableBros'
import { SignOutButton } from '@/components/buttons/SignOutButton'
import { FirstConnexion } from '@/components/FirstConnexion'
import { Presentation } from '@/components/Presentation'
import { authOptions } from '@/lib/authOptions.lib'
import { getServerSession } from 'next-auth'

export default async function Page() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          ...(!session?.user && { alignItems: 'center' }),
        }}
      >
        {session?.user ? (
          session?.user?.isFirstConnexion ? (
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
