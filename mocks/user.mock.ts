import { merge } from 'lodash'

interface User {
  email?: string
  name?: string
  image?: string
}

interface Session {
  user?: User
}

export function mockUserSession(): Session {
  const mockedUserSession = {
    user: {
      name: 'Test',
      email: 'test@test.com',
      image: null,
    },
  }
  return merge(mockedUserSession)
}
