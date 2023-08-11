'use client'

import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-2 gap-4">
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
      <button
        onClick={() => signIn('facebook', { callbackUrl: '/' })}
        className="w-full py-3 border flex items-center justify-center gap-2 border-slate-200 rounded-lg hover:border-slate-400 hover:shadow transition duration-150 bg-white"
      >
        <FontAwesomeIcon icon={faFacebook} className="block w-[24px] h-[24px] text-blue-600" />
        <span className="block">Sign in with Facebook</span>
      </button>
    </div>
  )
}

export default SignInPage
