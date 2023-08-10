import { AvailableTeammates } from '@/components/AvailableTeammates'
import { FirstConnexion } from '@/components/FirstConnexion'
import { Presentation } from '@/components/Presentation'
import { authOptions } from '@/lib/authOptions.lib'
import { getServerSession } from 'next-auth'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return <Presentation />
  }

  // @ts-expect-error Server Component
  return <>{session?.user?.isFirstConnexion ? <FirstConnexion /> : <AvailableTeammates />}</>
}
