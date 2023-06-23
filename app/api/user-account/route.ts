import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions.lib'
import { connectDB } from '@/services/db'
import { IAvailabilities, UserAccount } from '@/models/UserAccount.models'

interface IUserAccountRequestParams {
  town?: string
  availabilities?: IAvailabilities
  isFirstConnexion?: boolean
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return new Response('', { status: 401 })
  }

  const res = (await request.json()) as IUserAccountRequestParams
  await connectDB()
  const updatedUserAccount = await UserAccount.findOneAndUpdate(
    { email: session?.user?.email },
    {
      ...res,
    },
    { new: true },
  )
  return new Response(JSON.stringify(updatedUserAccount), {
    status: 200,
  })
}
