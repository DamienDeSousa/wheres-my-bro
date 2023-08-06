import { IUserAccount } from '@/models/UserAccount.models'
import { merge } from 'lodash'

export function mockUserAccount(): IUserAccount {
  const mockedUser: IUserAccount = {
    _id: undefined,
    isFirstConnexion: false,
    email: 'test@test.com',
    town: 'city',
    availabilities: {
      start: '1995-12-17T02:24:00.000Z',
      end: '1995-12-17T04:30:00.000Z',
    },
    level: 'intermediate',
    sport: 'musculation',
  }
  return merge(mockedUser)
}
