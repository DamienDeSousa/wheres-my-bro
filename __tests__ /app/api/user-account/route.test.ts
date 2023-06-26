/**
 * @jest-environment node
 */

import { PATCH } from '@/app/api/user-account/route'
import { mockRequest } from '@/mocks/http.mock'
import { mockUserSession } from '@/mocks/user.mock'
import { mockUserAccount } from '@/mocks/userAccount.mock'
import { IUserAccount } from '@/models/UserAccount.models'
import { partialUserAccountUpdate } from '@/services/modelHandlers/userAccount.modelhandler'
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

const mockedUser = mockUserAccount()

jest.mock('@/models/UserAccount.models', () => {
  const actualModule = jest.requireActual('@/models/UserAccount.models')
  return {
    ...actualModule,
    __esModule: true,
    UserAccount: {
      findOneAndUpdate: jest.fn().mockImplementation(() => Promise.resolve<IUserAccount>(mockedUser)),
    },
  }
})

jest.mock('@/services/modelHandlers/userAccount.modelhandler', () => {
  const actualModule = jest.requireActual('@/services/modelHandlers/userAccount.modelhandler')
  return {
    ...actualModule,
    __esModule: true,
    partialUserAccountUpdate: jest.fn(),
  }
})

describe('=== PATCH ===', () => {
  it('should update a new user account', async () => {
    const mockedUserSession = mockUserSession()
    ;(getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockedUserSession))
    ;(partialUserAccountUpdate as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ...mockedUser,
        town: 'Paris',
        isFirstConnexion: true,
      }),
    )
    const request = mockRequest({
      json: () =>
        Promise.resolve<object>({
          town: 'Paris',
          isFirstConnexion: true,
        }),
    })
    const response = await PATCH(request)
    expect(response.status).toBe(200)
    const res = await response.json()
    expect(res).toEqual({
      ...mockedUser,
      town: 'Paris',
      isFirstConnexion: true,
    })
  })

  it('should return 401 because no user logged', async () => {
    ;(getServerSession as jest.Mock).mockImplementation(() => Promise.resolve())
    const request = mockRequest()
    const response = await PATCH(request)
    expect(response.status).toBe(401)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })
})
