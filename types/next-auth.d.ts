import { IAvailabilities } from '@/models/UserAccount.models'
import { ETeammateLevel } from '@/services/profile/profile.types'
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    picture?: string | null
    sub?: string
    id?: string
    email: string
    name: string
    image: string
    isFirstConnexion?: boolean
    town?: string
    availabilities?: IAvailabilities
    sport?: string
    level?: ETeammateLevel
    description?: string
    contact?: string
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string
      email: string
      name: string
      image: string
      isFirstConnexion?: boolean
      town?: string
      availabilities?: IAvailabilities
      sport?: string
      level?: ETeammateLevel
      description?: string
      contact?: string
    }
  }
}
