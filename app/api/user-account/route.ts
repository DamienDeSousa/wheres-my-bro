import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions.lib'
import { IUserAccountRequestParams } from '@/services/interfaces/userAccount.interfaces'
import { partialUserAccountUpdate } from '@/services/modelHandlers/userAccount.modelhandler'

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return new Response('', { status: 401 })
  }

  const res = (await request.json()) as IUserAccountRequestParams
  const updatedUserAccount = partialUserAccountUpdate(session?.user?.email!, res)
  return new Response(JSON.stringify(updatedUserAccount), {
    status: 200,
  })
}
