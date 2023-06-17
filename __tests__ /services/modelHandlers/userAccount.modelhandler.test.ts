/**
 * @jest-environment node
 */

import { IUserAccount } from './../../../models/UserAccount.models'
import { getLoggedUserAccount } from '@/services/modelHandlers/userAccount.modelhandler'
import { getServerSession } from 'next-auth'

jest.mock('@/lib/authOptions.lib', () => {
  return {
    __esModule: true,
    authOptions: {},
  }
})

jest.mock('next-auth', () => {
  return {
    __esModule: true,
    getServerSession: jest.fn(),
  }
})

jest.mock('@/services/db', () => {
  const actualModule = jest.requireActual('@/services/db')
  return {
    ...actualModule,
    __esModule: true,
    connectDB: jest.fn().mockImplementation(() => Promise.resolve()),
  }
})

const mockedUser: IUserAccount = {
  _id: undefined,
  isFirstConnexion: true,
  email: 'test@test.com',
  town: 'city',
  availabilities: [Date()],
}

jest.mock('@/models/UserAccount.models', () => {
  const actualModule = jest.requireActual('@/models/UserAccount.models')
  return {
    ...actualModule,
    __esModule: true,
    UserAccount: {
      findOne: jest.fn().mockImplementation(() => Promise.resolve<IUserAccount>(mockedUser)),
    },
  }
})

describe('=== getLoggedUserAccount ===', () => {
  it('should return the logged user acount', async () => {
    getServerSession as jest.Mock
    const mockedUserSession = {
      user: {
        name: 'Test',
        email: 'test@test.com',
        image: null,
      },
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getServerSession.mockImplementation(() => Promise.resolve(mockedUserSession))
    const userAccount = await getLoggedUserAccount()
    expect(userAccount).toEqual(mockedUser)
  })

  it('should return null because no user is logged', async () => {
    getServerSession as jest.Mock
    const mockedUserSession = {
      user: undefined,
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getServerSession.mockImplementation(() => Promise.resolve(mockedUserSession))
    const userAccount = await getLoggedUserAccount()
    expect(userAccount).toEqual(mockedUser)
  })
})
