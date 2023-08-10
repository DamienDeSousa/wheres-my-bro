import { AvailableTeammates } from '@/components/AvailableTeammates'
import { SignOutButton } from '@/components/buttons/SignOutButton'
import { FirstConnexion } from '@/components/FirstConnexion'
import { Presentation } from '@/components/Presentation'
import { authOptions } from '@/lib/authOptions.lib'
import { getServerSession } from 'next-auth'

export default async function Page() {
  const session = await getServerSession(authOptions)

  return (
    <>
      {session?.user ? (
        session?.user?.isFirstConnexion ? (
          <div className="flex flex-col gap-5">
            <SignOutButton />
            <FirstConnexion />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <SignOutButton />
            {/* @ts-expect-error Server Component */}
            <AvailableTeammates />
          </div>
        )
      ) : (
        <Presentation />
      )}
    </>
  )
}
