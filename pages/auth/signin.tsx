import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const SignInPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/')
    }
  }, [status, session, router])

  if (session) {
    console.log(session)
    return (
      <>
        {session?.user?.email}
        {session?.user?.name}
        <button onClick={() => router.push('/api/auth/signout')}>Sign out</button>
      </>
    )
  }

  return (
    <div>
      <button onClick={() => signIn('google', { callbackUrl: '/' })}>Sign in with Google</button>
    </div>
  )
}

export default SignInPage
