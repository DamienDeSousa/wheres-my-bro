'use client'

import { Button, EButtonVariation } from '@/components/inputs/button.components'
// import { faFacebook } from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-2 gap-4">
      <Button onClick={() => signIn('google', { callbackUrl: '/' })} variant={EButtonVariation.SIGNIN}>
        <Image
          className="block"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
          width={24}
          height={24}
        ></Image>
        <span className="block">Sign in with Google</span>
      </Button>
      {/* <Button onClick={() => signIn('facebook', { callbackUrl: '/' })} variant={EButtonVariation.SIGNIN}>
        <FontAwesomeIcon icon={faFacebook} className="block w-[24px] h-[24px] text-blue-600" />
        <span className="block">Sign in with Facebook</span>
      </Button> */}
    </div>
  )
}

export default SignInPage
