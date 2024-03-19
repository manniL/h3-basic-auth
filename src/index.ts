import { createError, defineEventHandler, getHeader, setHeader } from 'h3'
import type { H3Event } from 'h3'
import type { BasicAuthOptions, AuthProvider } from './types'

export function createBasicAuthMiddleware (opts: BasicAuthOptions) {
  if (opts.bypass === true) {
    return defineEventHandler(() => {})
  }
  const basicAuth = createBasicAuth(opts)

  return defineEventHandler(async (event: H3Event) => {
    // Check if user is authenticated
    const isAuthenticated = await basicAuth.check(event)
    if (isAuthenticated) {
      return
    }

    const authRes = await basicAuth.authorize(event)

    // Send headers
    if (authRes.headers) {
      for (const header in authRes.headers) {
        setHeader(event, header, authRes.headers[header])
      }
    }

    // Check to render unauthenticated page
    if (!authRes.authorized) {
      throw createError({
        statusCode: 401,
        message: authRes.message || 'Unauthorized'
      })
    }
  })
}

const createBasicAuth: AuthProvider<{ username: string, password: string }> = opts => ({
  check (event) {
    const [type, token] = (getHeader(event, 'Authorization') ?? '').split(' ')
    if (type === 'Basic') {
      const [user, pass] = Buffer.from(token, 'base64').toString().split(':')
      event.context.auth = { session: { user } }
      return user === opts.username && pass === opts.password
    }
    return false
  },
  authorize () {
    return {
      authorized: false,
      message: 'Login Required',
      headers: { 'WWW-Authenticate': 'Basic realm="Login Required"' }
    }
  }
})
