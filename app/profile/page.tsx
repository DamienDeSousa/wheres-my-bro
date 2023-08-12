'use client'

import { EditProfile } from '@/components/forms/EditProfile.forms.components'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session?.user) {
    router.push('/')
  }

  return <EditProfile />
}
