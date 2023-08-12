'use client'

import { EditProfile } from '@/components/forms/EditProfile.forms.components'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Page = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session?.user) {
      router.push('/')
    }
  }, [session, router])

  return <EditProfile />
}

export default Page
