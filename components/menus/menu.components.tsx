'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button, EButtonVariation } from '../inputs/button.components'

export const Menu = () => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <>
      {session?.user && (
        <div className="flex gap-2">
          <Button variant={EButtonVariation.LINK} onClick={() => router.push('/profile')}>
            Profil
          </Button>
          <Button variant={EButtonVariation.LINK} onClick={() => signOut()}>
            Déconnexion
          </Button>
        </div>
      )}
    </>
  )
}
