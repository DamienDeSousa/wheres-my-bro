'use client'

import { signOut } from 'next-auth/react'

export const SignOutButton: React.FC = (props: any) => {
  return <button onClick={() => signOut()}>Sign out</button>
}
