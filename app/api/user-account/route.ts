import { authOptions } from '@/lib/authOptions.lib'
import { UserAccount } from '@/models/UserAccount.models'
import { IUserAccountRequestParams } from '@/services/interfaces/userAccount.interfaces'
import { getServerSession } from 'next-auth'

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return new Response('', { status: 401 })
  }

  const res = (await request.json()) as IUserAccountRequestParams
  const updatedUserAccount = await UserAccount.findOneAndUpdate({ _id: session?.user?.id }, { ...res }, { new: true })
  return new Response(JSON.stringify(updatedUserAccount), {
    status: 200,
  })
}
