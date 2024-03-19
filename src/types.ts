import type { H3Event } from 'h3'

export interface AuthContext {
  user: string;
  pass: string;
}

export type AuthSession = Record<string, string>
export type HTTPHeaders = Record<string, string>

export interface AuthorizeResult {
  authorized?: Boolean,
  message?: string,
  redirect?: string,
  headers?: HTTPHeaders
  session?: AuthSession
}

export interface AuthImplementation {
  check: (req: H3Event) => boolean | Promise<boolean>
  authorize: (req: H3Event) => AuthorizeResult | Promise<AuthorizeResult>
}

export type AuthProvider<T = any> = (options: T) => AuthImplementation

export function defineAuthProvider<T = any> (provider: AuthProvider<T>): AuthProvider<T> {
  return provider
}

export interface BasicAuthOptions {
  sessionSecret?: string
  bypass?: boolean
  onAuthorize?: (authResult: AuthorizeResult, event: H3Event) => void | Promise<void>
  username: string,
  password: string,
}

declare module 'h3' {
  interface H3EventContext {
    auth?: { session: AuthSession }
  }
}
