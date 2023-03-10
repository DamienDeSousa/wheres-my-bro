import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const SignInPage = () => {
  const router = useRouter()

  return (
    <div>
      <button onClick={async () => await signIn('google', { callbackUrl: '/' })}>Sign in with Google</button>
    </div>
  )
}

export default SignInPage
