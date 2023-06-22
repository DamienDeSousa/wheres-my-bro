import { IUserAccount } from '@/models/UserAccount.models'
import { merge } from 'lodash'

export function mockUserAccount(): IUserAccount {
  const mockedUser: IUserAccount = {
    _id: undefined,
    isFirstConnexion: false,
    email: 'test@test.com',
    town: 'city',
    availabilities: [Date()],
  }
  return merge(mockedUser)
}
