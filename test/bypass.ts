import { createApp, defineEventHandler, toNodeListener } from 'h3'
import { listen } from 'listhen'
import { createBasicAuthMiddleware } from '../src'

const app = createApp()

app.use(createBasicAuthMiddleware({
  bypass: true,
  username: 'test',
  password: 'test'
}))

app.use(defineEventHandler(event => `Welcome ${event.context.auth?.session ? 'user' : 'guest'}!`))

listen(toNodeListener(app))
