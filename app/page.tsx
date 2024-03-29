import { AvailableBros } from '@/components/AvailableBros'
import { FirstConnexion } from '@/components/forms/FirstConnexion.forms.components'
import { SetExpiredAvailabilities } from '@/components/forms/SetExpiredAvailabilities.forms.components'
import { Presentation } from '@/components/Presentation'
import { authOptions } from '@/lib/authOptions.lib'
import { isAvailabilityExpired } from '@/services/dates/date.commons'
import { getServerSession } from 'next-auth'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return <Presentation />
  }

  switch (true) {
    case session?.user?.isFirstConnexion:
      return <FirstConnexion />
    case (session?.user?.availability && isAvailabilityExpired(session.user.availability)) ||
      !session?.user?.availability:
      return <SetExpiredAvailabilities />
    default:
      // @ts-expect-error Server Component
      return <AvailableBros />
  }
}
