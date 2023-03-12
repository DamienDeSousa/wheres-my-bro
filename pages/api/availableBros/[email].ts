import { Bro, IBro } from '@/models/User.models'
import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import connectDB from '@/services/db'
import { NextApiRequest, NextApiResponse } from 'next'

type EmailParamQuery = {
  email: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query as EmailParamQuery
  await connectDB()
  const userAccount: IUserAccount | null = await UserAccount.findOne({ email })

  if (!userAccount) {
    // ERROR
  }

  const matchedUserAccounts: IUserAccount[] = await UserAccount.find({
    town: userAccount?.town,
    availabilities: { $in: userAccount?.availabilities },
    email: { $ne: userAccount?.email },
  })

  const emails = matchedUserAccounts.map(matchedUserAccount => matchedUserAccount.email)
  console.log('matchedUserAccounts = ', matchedUserAccounts)
  console.log('emails = ', emails)
  const matchedBros: IBro[] = await Bro.find({
    email: { $in: emails },
  })

  res.status(200).json([...matchedBros])
}
