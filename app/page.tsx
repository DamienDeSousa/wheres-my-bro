import { AvailableTeammates } from '@/components/AvailableTeammates'
import { FirstConnexion } from '@/components/forms/FirstConnexion.forms.components'
import { SetExpiredAvailabilities } from '@/components/forms/SetExpiredAvailabilities.forms.components'
import { Presentation } from '@/components/Presentation'
import { authOptions } from '@/lib/authOptions.lib'
import { isTimeSlotExpired } from '@/services/dates/date.commons'
import { getServerSession } from 'next-auth'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return <Presentation />
  }

  switch (true) {
    case session?.user?.isFirstConnexion:
      return <FirstConnexion />
    case isTimeSlotExpired({
      start: new Date(session.user.availabilities!.start),
      end: new Date(session.user.availabilities!.end),
    }):
      return <SetExpiredAvailabilities />
    default:
      // @ts-expect-error Server Component
      return <AvailableTeammates />
  }
}
