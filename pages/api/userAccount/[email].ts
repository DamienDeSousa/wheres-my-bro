import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import connectDB from '@/services/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type EmailParamQuery = {
  email: string
}

type EmailParamBody = {
  town: string
  availabilities: Array<string>
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query as EmailParamQuery
  const { town, availabilities } = req.body as EmailParamBody
  const session = await getSession({ req })

  if (session?.user?.email !== email) {
    // erreur par autorisé
  }

  await connectDB()
  const userAccount: IUserAccount | null = await UserAccount.findOneAndUpdate(
    { email },
    { town, availabilities, isFirstConnexion: false },
    { new: true },
  )

  res.status(200).json({ userAccount })
}
