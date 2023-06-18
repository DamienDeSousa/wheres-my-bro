/**
 * @jest-environment node
 */

import { IUserAccount } from './../../../models/UserAccount.models'
import { getLoggedUserAccount } from '@/services/modelHandlers/userAccount.modelhandler'
import { getServerSession } from 'next-auth'
import { mockUserAccount } from '@/mocks/userAccount.mock'
import { mockUserSession } from '@/mocks/user.mock'

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

const mockedUser = mockUserAccount()

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
    const mockedUserSession = mockUserSession()
    ;(getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockedUserSession))
    const userAccount = await getLoggedUserAccount()
    expect(userAccount).toEqual(mockedUser)
  })

  it('should return null because no user is logged', async () => {
    const mockedUserSession = {
      user: undefined,
    }
    ;(getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockedUserSession))
    const userAccount = await getLoggedUserAccount()
    expect(userAccount).toEqual(mockedUser)
  })
})
