import { signOut, useSession } from 'next-auth/react'
import { Presentation } from '@/components/Presentation'
import { FirstConnexion } from '@/components/FirstConnexion'
import { AvailableBros } from '@/components/AvailableBros'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions.lib'
import connectDB from '@/services/db'
import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import { SignOutButton } from '@/components/buttons/SignOutButton'

export default async function Page() {
  const session = await getServerSession(authOptions)
  await connectDB()
  const userAccount: IUserAccount | null = session ? await UserAccount.findOne({ email: session?.user?.email }) : null

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          ...(!session && { alignItems: 'center' }),
        }}
      >
        {session ? (
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
