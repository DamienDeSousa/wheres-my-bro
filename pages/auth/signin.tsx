import { signIn, signOut, useSession } from 'next-auth/react'

const SignInPage = () => {
  const { data: session } = useSession()

  if (session) {
    console.log(session)
    return (
      <>
        {session?.user?.email}
        {session?.user?.name}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <div>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </div>
  )
}

export default SignInPage
