'use client'

import { signIn } from 'next-auth/react'

const SignInPage = () => {
  return (
    <div>
      <button onClick={() => signIn('google', { callbackUrl: '/' })}>Sign in with Google</button>
    </div>
  )
}

export default SignInPage
