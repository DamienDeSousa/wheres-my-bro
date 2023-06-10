'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignInPage = () => {
  const router = useRouter()

  return (
    <div>
      <button onClick={() => signIn('google', { callbackUrl: '/' })}>Sign in with Google</button>
    </div>
  )
}

export default SignInPage
