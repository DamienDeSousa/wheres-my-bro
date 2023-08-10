'use client'

import { signOut } from 'next-auth/react'

export const SignOutButton: React.FC = () => {
  return <button onClick={() => signOut()}>Déconnexion</button>
}
