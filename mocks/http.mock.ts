import { merge } from 'lodash'

interface MockRequestParameters {
  json?: () => Promise<object>
}

export function mockRequest(params?: MockRequestParameters): Request {
  const request: Request = {
    cache: 'default',
    credentials: 'same-origin',
    destination: '',
    headers: {
      append: jest.fn(),
      delete: jest.fn(),
      get: jest.fn(),
      has: jest.fn(),
      set: jest.fn(),
      forEach: jest.fn(),
      entries: jest.fn(),
      keys: jest.fn(),
      values: jest.fn(),
      [Symbol.iterator]: jest.fn(),
    },
    integrity: '',
    keepalive: false,
    method: 'PATCH',
    mode: 'same-origin',
    redirect: 'follow',
    referrer: '',
    referrerPolicy: 'same-origin',
    signal: {
      aborted: false,
      onabort: jest.fn(),
      reason: {},
      throwIfAborted: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    },
    url: '',
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    json: jest.fn(),
    text: jest.fn(),
  }
  return merge(request, params)
}
