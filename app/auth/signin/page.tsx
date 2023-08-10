'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

const SignInPage = () => {
  return (
    <div className="flex h-screen items-center justify-center p-2">
      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="w-full py-3 border flex items-center justify-center gap-2 border-slate-200 rounded-lg hover:border-slate-400 hover:shadow transition duration-150 bg-white"
      >
        <Image
          className="block"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
          width={24}
          height={24}
        ></Image>
        <span className="block">Sign in with Google</span>
      </button>
    </div>
  )
}

export default SignInPage
