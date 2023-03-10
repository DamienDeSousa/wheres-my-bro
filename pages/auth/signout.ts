import { NextApiHandler } from 'next'
import { signOut } from 'next-auth/react'

const signOutHandler: NextApiHandler = async (req, res) => {
  await signOut({ redirect: false })
  res.redirect('/')
}

export default signOutHandler
