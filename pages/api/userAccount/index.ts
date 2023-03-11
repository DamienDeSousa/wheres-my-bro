import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { UserAccount, IUserAccount } from '@/models/UserAccount.models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  console.log(session)

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const { user } = session
  const email = user?.email

  if (!email) {
    res.status(400).json({ error: 'Missing email in session' })
    return
  }

  const userAccount: IUserAccount = await UserAccount.findOne({ email })

  if (!userAccount) {
    res.status(404).json({ error: 'User account not found' })
    return
  }

  res.status(200).json(userAccount)
}
