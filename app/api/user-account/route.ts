import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions.lib'
import connectDB from '@/services/db'
import { UserAccount } from '@/models/UserAccount.models'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    // erreur
  }
  const res = await request.json()
  const { town, availabilities } = res
  await connectDB()
  await UserAccount.updateOne(
    { email: session?.user?.email },
    {
      town,
      availabilities,
      isFirstConnexion: false,
    },
  )
  // extract town and availabilities
  // update user account with these data and set isFirstConnection false
  // Do whatever you want
  return new Response('Hello World!', {
    status: 200,
  })
}
